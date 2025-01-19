import prisma from "@src/lib/prisma"
import { json } from "@sveltejs/kit"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { JWT_SECRET } from "$env/static/private";
import { setCookie } from "@src/lib/util/cookie";

export async function POST({ request, cookies, locals }) {
    try {
        const { identifier, password } = await request.json();

        if (!identifier || !password) {
            return json({ success: false, error: 'All fields are required.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        });

        if (!existingUser) {
            return json({ success: false, error: 'User does not exist.' }, { status: 409 });
        }

        const isPasswordMatch = await bcrypt.compare(existingUser.hashedPassword, password)
        if (isPasswordMatch) {
            return json({ success: false, error: 'Incorrect email or password.' }, { status: 409 });
        }

        const token = jwt.sign(
            {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        setCookie(cookies, 'token', token);
        return json({
            success: true, token, user: {
                id: existingUser.id,
                username: existingUser.username
            }
        }, { status: 201 });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return json({ success: false, error: 'An unexpected error occurred.' }, { status: 500 });
    }
}