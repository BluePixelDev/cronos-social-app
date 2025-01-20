import { json } from "@sveltejs/kit";
import prisma from "@src/lib/prisma";

export async function POST({ request, locals }) {
    if (!locals.user || locals.user.role != "ADMIN") {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const table = formData.get('table');

    if (!file || !(file instanceof File)) {
        return json({success: false, message: 'No file uploaded or invalid file' }, { status: 400 });
    }

    if (!file || file.type !== 'application/json') {
        return json({success: false, message: 'Please upload a valid JSON file' }, { status: 400 });
    }

    if (!table || (table !== 'user' && table !== 'post')) {
        return json({success: false, message: 'Invalid target table' }, { status: 400 });
    }
    try {
        // Read the file content
        const text = await file.text();
        const jsonData = JSON.parse(text);

        // Validate that jsonData is an array
        if (!Array.isArray(jsonData)) {
            return json({ success: false, message: 'JSON file must contain an array of records' }, { status: 400 });
        }

        switch (table) {
            case "user":
                const result = await prisma.user.createMany({
                    data: jsonData.map(user => ({
                        username: user.username,
                        email: user.email,
                        bio: user.bio,
                        hashedPassword: user.hashedPassword,
                        followCount: user.followCount
                    })),
                    skipDuplicates: true
                });
                return json({ success: true, message: `Created ${result.count} users` });

            case "post":
                if (table === 'post') {
                    const result = await prisma.post.createMany({
                        data: jsonData.map(post => ({
                            userId: post.userId,
                            title: post.title,
                            content: post.content,
                            authorId: post.authorId,
                        })),
                        skipDuplicates: true
                    });
                    return json({ success: true, message: `Created ${result.count} posts` });
                }
        }

    } catch (error) {
        console.error('Error processing JSON file:', error);
        const errorMessage = error instanceof Error ? error.message : String(error)
        return json({
            success: false,
            message: `Error processing file: ${errorMessage}`
        }, { status: 500 });
    }
}