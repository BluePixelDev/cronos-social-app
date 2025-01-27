import prisma from '$lib/prisma';

type PostWithData = {
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

export const load = async ({ locals }) => {
    const posts = await prisma.$queryRaw<PostWithData[]>`
        SELECT 
            p.id,
            p.userId,
            p.content,
            p.createdAt,
            p.updatedAt,
            p.likeCount,
            u.username,
            u.profilePicture,
            CASE WHEN l.userId IS NOT NULL THEN true ELSE false END as isLiked,
            pp.viralityScore,
            pp.engagementRate,
            em.engagementRate as userEngagementRate
        FROM Post p
        INNER JOIN User u ON u.id = p.userId
        LEFT JOIN PostPopularity pp ON pp.postId = p.id
        LEFT JOIN EngagementMetrics em ON em.userId = p.userId
        LEFT JOIN \`Like\` l ON l.postId = p.id AND l.userId = ${locals.user?.id}
        WHERE p.createdAt > NOW() - INTERVAL 30 DAY
        ORDER BY 
            COALESCE(pp.viralityScore, 0) * 0.6 + 
            COALESCE(pp.engagementRate, 0) * 0.4 DESC
        LIMIT 50;
    `;

    return { posts };
};