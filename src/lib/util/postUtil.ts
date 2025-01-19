export const post = async (content: string, userId: number) => {
    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, content }),
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};