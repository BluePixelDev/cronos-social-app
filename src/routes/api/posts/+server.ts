import prisma from '@lib/prisma';
import { Prisma } from '@prisma/client';
import { json } from '@sveltejs/kit';

export async function GET() {
    const posts = await prisma.post.findMany({
        include: { user: true }
    });
    return json(posts);
}

export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { content } = await request.json();

        // Create the post first
        const post = await prisma.post.create({
            data: {
                content,
                userId: locals.user.id,
            },
        });

        // Create PostPopularity record
        await prisma.postPopularity.create({
            data: {
                postId: post.id,
                viralityScore: 0,
                engagementRate: 0,
            }
        });

        return json({ success: true, post });
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function DELETE({ request, locals }) {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { postId } = await request.json();
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                userId: true
            }
        });

        if (!post) {
            return json({ error: 'Post not found' }, { status: 404 });
        }

        if (post.userId !== locals.user.id) {
            return json({ error: 'Unauthorized to delete this post' }, { status: 403 });
        }

        await prisma.$transaction([
            prisma.like.deleteMany({
                where: {
                    postId: postId
                }
            }),
            prisma.postPopularity.deleteMany({
                where: {
                    postId: postId
                }
            }),
            prisma.post.delete({
                where: {
                    id: postId,
                }
            }),
        ]);

        return json({ success: true });
    } catch (error) {
        console.error('Failed to delete post:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return json({ error: 'Post not found' }, { status: 404 });
            }
        }

        return json({ error: 'Failed to delete post' }, { status: 500 });
    }
}