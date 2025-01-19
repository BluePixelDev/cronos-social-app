import { JWT_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import jwt, { type JwtPayload } from "jsonwebtoken"

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');
    
    if (token) {
        try {
            const user = jwt.verify(token, JWT_SECRET) as JwtPayload;
            console.log(user)
            event.locals.user = { id: user.id, username: user.username };
        } catch (err) {
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
};