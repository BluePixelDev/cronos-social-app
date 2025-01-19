import prisma from '@lib/prisma';
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
        const post = await prisma.post.create({
            data: {
                content,
                userId: locals.user.id,
            }
        });

        return json(post);
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to create post' }, { status: 500 });
    }
}