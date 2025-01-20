import prisma from '@lib/prisma';
import { writeAuditLog } from '@src/lib/util/auditLogUtil';
import { setCookie } from '@src/lib/util/cookie';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'FALLBACK_TESTING_KEY';
export async function POST({ request, cookies }) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return json({ success: false, error: 'All fields are required.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return json({ success: false, error: 'Email or nickname already taken.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword,
                followCount: 0
            },
        });

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        writeAuditLog(user.id, `New user registered`)
        setCookie(cookies, 'token', token);
        return json({
            success: true, token, user: {
                id: user.id,
                username: user.username
            }
        }, { status: 201 });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return json({ success: false, error: 'An unexpected error occurred.' }, { status: 500 });
    }
}