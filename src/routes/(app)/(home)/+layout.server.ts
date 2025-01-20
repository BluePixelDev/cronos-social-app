import prisma from '$lib/prisma';

type PostWithScore = {
    id: number;
    userId: number;
    username: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likeCount: number;
    isLiked: boolean
    viralityScore: number | null;
    engagementRate: number | null;
    score: number;
};

export const load = async ({locals}) => {
    const posts = await prisma.$queryRaw<PostWithScore[]>`
    SELECT 
    ps.*,
    CASE WHEN l.userId IS NOT NULL THEN true ELSE false END as isLiked
    FROM PostScores ps
    LEFT JOIN \`Like\` l ON l.postId = ps.id AND l.userId = ${locals.user?.id}
    WHERE ps.createdAt > NOW() - INTERVAL 30 DAY
    ORDER BY ps.score DESC
    LIMIT 100;
    `;

    return { posts };
};