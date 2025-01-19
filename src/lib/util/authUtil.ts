import { invalidateAll } from '$app/navigation';

export async function login(identifier: string, password: string) {
    const response = await fetch("/api/auth/login", {
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
    const response = await fetch("/api/auth/register", {
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