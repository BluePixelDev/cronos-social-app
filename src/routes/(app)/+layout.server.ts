import prisma from '$lib/prisma';

type PostWithScore = {
    id: number;
    userId: number;
    username: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likeCount: number;
    viralityScore: number | null;
    engagementRate: number | null;
    score: number;
};

export const load = async () => {
    const posts = await prisma.$queryRaw<PostWithScore[]>`
    SELECT 
        p.id,
        p.content,
        p.createdAt,
        p.updatedAt,
        p.likeCount,
        u.id as userId,
        u.username as username,
        pp.viralityScore,
        pp.engagementRate,
        (pp.viralityScore + pp.engagementRate) * EXP(-((UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(p.createdAt)) / 86400.0 / 2.0)) AS score
    FROM \`Post\` p
    LEFT JOIN \`PostPopularity\` pp ON pp.\`postId\` = p.id
    LEFT JOIN \`User\` u ON p.userId = u.id
    WHERE p.\`createdAt\` > NOW() - INTERVAL 30 DAY
    ORDER BY score DESC
    LIMIT 100
    `;

    return { posts };
};