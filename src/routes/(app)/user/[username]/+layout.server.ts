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
                following:{
                    select: {
                        followerId: true,
                    },
                    where: {
                        followerId: locals.user?.id ?? -1 
                    }
                }
            },
        }
    )

    if (!profileData) {
        return error(404)
    }

    return {
        profileData: {
            ...profileData,
            isFollowed: profileData.following.length > 0
        }
    };
};