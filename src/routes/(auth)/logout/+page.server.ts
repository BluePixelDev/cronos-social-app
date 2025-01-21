import { clearCookie } from "@src/lib/util/cookie";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ cookies, locals }) => {
        clearCookie(cookies, 'token')
        locals.user = null;
        throw redirect(303, '/');
    }
};