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
    secure: false,
    maxAge: number = 3600 // Default: 1 hour
) {
    cookies.set(name, value, {
        secure: false,
        maxAge,            
        path: '/',         
        sameSite: 'strict' 
    });
}

/**
 * Utility function to clear an HTTP-only cookie
 * @param cookies - SvelteKit's Cookies object
 * @param name - Name of the cookie to clear
 */
export function clearCookie(cookies: Cookies, name: string) {
    cookies.set(name, '', {
        secure: false,
        maxAge: 0,
        path: '/'
    });
}