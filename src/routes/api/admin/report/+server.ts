import prisma from '@src/lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (!locals.user || locals.user.role != "ADMIN") {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        const totalUsers = await prisma.user.count();
        const totalPosts = await prisma.post.count();
        const totalLikes = await prisma.like.count();
        const totalFollowers = await prisma.follow.count();

        const postsWithLikes = await prisma.post.findMany({
            include: {
                likes: true,
            },
        });

        const averageLikesPerPost = postsWithLikes.length
            ? postsWithLikes.reduce((acc, post) => acc + post.likes.length, 0) / postsWithLikes.length
            : 0;

        const report = {
            totalUsers,
            totalPosts,
            totalLikes,
            totalFollowers,
            averageLikesPerPost,
        };

        return new Response(JSON.stringify(report), { status: 200 });
    } catch (error) {
        let errorMessage = error instanceof Error? error.message : String(error)
        return new Response(JSON.stringify({ message: 'Error generating report', error: errorMessage }), {
            status: 500,
        });
    }
}