import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@src/lib/prisma.js";
import { json } from "@sveltejs/kit";

export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await request.json();

    if (!postId) {
        return json({ success: false, error: "Post ID is required" }, { status: 400 });
    }

    try {
        const [like] = await prisma.$transaction([
            prisma.like.create({
                data: {
                    userId: locals.user.id,
                    postId: postId,
                },
            }),
            prisma.post.update({
                where: { id: postId },
                data: {
                    likeCount: {
                        increment: 1
                    }
                }
            })
        ])

        return json({ success: true, data: like });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
            return json({ success: true, message: "Already liked" });
        }

        console.error(error);
        return json({ success: false, error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE({ request, locals }) {
    if (!locals.user) {
        return json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await request.json();

    if (!postId) {
        return json({ success: false, error: "Post ID is required" }, { status: 400 });
    }

    try {
        const [like] = await prisma.$transaction([
            prisma.like.deleteMany({
                where: {
                    userId: locals.user.id,
                    postId: postId,
                },
            }),
            prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    likeCount: {
                        increment: -1
                    }
                }
            })
        ])

        return json({ success: true, data: like });
    } catch (error) {
        console.error(error);
        return json({ success: false, error: "Something went wrong" }, { status: 500 });
    }
}