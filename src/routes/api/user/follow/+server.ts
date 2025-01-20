import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@src/lib/prisma";
import { json } from "@sveltejs/kit";

export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await request.json();

    if (!userId) {
        return json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    if (userId == locals.user.id) {
        return json({ success: false, error: "User cannot follow themself" }, { status: 400 });
    }

    try {
        await prisma.$transaction([
            prisma.follow.create({
                data: {
                    followedId: userId,
                    followerId: locals.user.id,
                },
            }),
            prisma.user.update({
                where: { id: userId },
                data: {
                    followCount: {
                        increment: 1
                    }
                }
            })
        ])

        return json({ success: true });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
            return json({ success: false, message: "Already following" });
        }

        console.error(error);
        return json({ success: false, error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE({ request, locals }) {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await request.json();

    if (!userId) {
        return json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    if (userId == locals.user.id) {
        return json({ success: false, error: "User cannot unfollow themself" }, { status: 400 });
    }

    try {
        await prisma.$transaction([
            prisma.follow.deleteMany({
                where: {
                    followedId: userId,
                    followerId: locals.user.id
                },
            }),
            prisma.user.update({
                where: { id: userId },
                data: {
                    followCount: {
                        increment: -1
                    }
                }
            })
        ])
        return json({ success: true });
    } catch (error) {
        console.error(error);
        return json({ success: false, error: "Something went wrong" }, { status: 500 });
    }
}