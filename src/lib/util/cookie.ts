import type { Cookies } from "@sveltejs/kit";

/**
 * Utility function to set an HTTP-only cookie
 * @param cookies - SvelteKit's Cookies object
 * @param name - Name of the cookie
 * @param value - Value of the cookie (e.g., a JWT token)
 * @param maxAge - Max age of the cookie in seconds (default: 1 hour)
 */
export function setCookie(
    cookies: Cookies,
    name: string,
    value: string,
    maxAge: number = 3600 // Default: 1 hour
) {
    cookies.set(name, value, {
        httpOnly: true,    // Prevent client-side access
        maxAge,            // Lifetime in seconds
        secure: true,      // Use HTTPS in production
        path: '/',         // Make cookie accessible site-wide
        sameSite: 'strict' // Prevent cross-site request forgery
    });
}

/**
 * Utility function to clear an HTTP-only cookie
 * @param cookies - SvelteKit's Cookies object
 * @param name - Name of the cookie to clear
 */
export function clearCookie(cookies: Cookies, name: string) {
    cookies.set(name, '', {
        httpOnly: true,
        maxAge: 0,  // Expire the cookie immediately
        path: '/'
    });
}