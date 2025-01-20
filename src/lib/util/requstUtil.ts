const POST_API_ENDPOINT = "/api/posts"
const LIKE_API_ENDPOINT = "/api/posts/like"
const FOLLOW_API_ENDPOINT = "/api/user/follow"
const AUTH_API_ENDPOINT = "/api/auth"
const BIO_API_ENDPOINT = "/api/user/bio"

import { invalidateAll } from '$app/navigation';

//--- USER AUTH ----
export async function login(identifier: string, password: string) {
    const response = await fetch(`${AUTH_API_ENDPOINT}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
        await invalidateAll();
        return await response.json();
    } else {
        const { error } = await response.json();
        throw new Error(error || "Login failed.");
    }
}
export async function register(
    username: string,
    email: string,
    password: string
) {
    const response = await fetch(`${AUTH_API_ENDPOINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        await invalidateAll();
        return await response.json();
    } else {
        const { error } = await response.json();
        throw new Error(error || "Registration failed.");
    }
}
export async function logout() {
    try {
        const formData = new FormData();
        const response = await fetch('/logout', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            await invalidateAll();
            window.location.href = '/';
        }
    }
    catch (error) {
        console.log(error)
    }
}

//---- POST ----
export const post = async (content: string) => {
    try {
        const response = await fetch(POST_API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const deletePost = async (postId: number) => {
    try {
        const response = await fetch(POST_API_ENDPOINT, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

//---- POST LIKES ----
export const like = async (postId: number) => {
    try {
        const response = await fetch(LIKE_API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId }),
        });

        if (!response.ok) {
            throw new Error('Failed to like post');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const removeLike = async (postId: number) => {
    try {
        const response = await fetch(LIKE_API_ENDPOINT, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove like from post');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

//---- USER FOLLOW ----
export const follow = async (userId: number) => {
    try {
        const response = await fetch(FOLLOW_API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error('Failed to unfollow user');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
export const unfollow = async (userId: number) => {
    try {
        const response = await fetch(FOLLOW_API_ENDPOINT, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error('Failed to follow user');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};


export const updateBio = async (newBio: string) => {
    try {
        const response = await fetch(BIO_API_ENDPOINT, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newBio }),
        });

        if (!response.ok) {
            throw new Error('Failed to update user bio');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};