import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
    const profileData = await prisma.user.findFirst(
        {
            where: { username: params.username },
            select: {
                id: true,
                username: true,
                bio: true,
                followCount: true,
                profilePicture: true,
                followers: {
                    where: {
                        followedId: locals.user?.id
                    },
                    select: {
                        followerId: true
                    }
                },
            },
        }
    )

    if (!profileData) {
        return error(404)
    }

    return {
        profileData: {
            ...profileData,
            isFollowed: profileData.followers.length > 0
        }
    };
};