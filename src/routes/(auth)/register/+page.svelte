<script lang="ts">
    import { goto } from "$app/navigation";
    import SubmitButton from "@src/components/SubmitButton.svelte";
    import { register } from "@src/lib/util/authUtil";

    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let errorMessage = "";

    const handleRegister = async () => {
        try {
            await register(username, email, password);
            goto("/");
        } catch (error) {
            errorMessage = (error instanceof Error) ? error.message : String(error)
        }
    };
</script>

<div
    class="flex flex-1 flex-col justify-center flex-grow max-w-[30em] mx-auto p-6"
>
    <div
        class="flex flex-col bg-gray-900 bg-opacity-40 p-6 rounded-lg shadow-md space-y-4"
    >
        <h2 class="text-lg font-semibold text-white">Register</h2>

        {#if errorMessage}
            <p class="text-red-500 text-sm">{errorMessage}</p>
        {/if}

        <!-- Name Input -->
        <input
            type="text"
            class="w-full p-3 bg-transparent text-white text-sm border border-gray-700 rounded focus:outline-none"
            bind:value={username}
            placeholder="Name"
        />

        <!-- Email Input -->
        <input
            type="email"
            class="w-full p-3 bg-transparent text-white text-sm border border-gray-700 rounded focus:outline-none"
            bind:value={email}
            placeholder="Email"
        />

        <!-- Password Input -->
        <input
            type="password"
            class="w-full p-3 bg-transparent text-white text-sm border border-gray-700 rounded focus:outline-none"
            bind:value={password}
            placeholder="Password"
        />

        <!-- Confirm Password Input -->
        <input
            type="password"
            class="w-full p-3 bg-transparent text-white text-sm border border-gray-700 rounded focus:outline-none"
            bind:value={confirmPassword}
            placeholder="Confirm Password"
        />

        <!-- Submit Button -->
        <SubmitButton onClick={handleRegister}>Register</SubmitButton>

        <div class="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <a
                class="text-blue-500 hover:underline cursor-pointer"
                href="/login"
            >
                Login
            </a>
        </div>
    </div>
</div>
