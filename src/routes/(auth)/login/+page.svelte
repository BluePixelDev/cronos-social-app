<script lang="ts">
    import SubmitButton from "@components/SubmitButton.svelte";
    import { goto } from "$app/navigation";
    import Error from "@src/routes/+error.svelte";
    import { login } from "@src/lib/util/requstUtil";

    let identifier = "";
    let password = "";
    let errorMessage = "";

    const handleLogin = async () => {
        try {
            await login(identifier, password);
            goto("/");
        } catch (error) {
            errorMessage =
                error instanceof Error ? error.message : String(error);
        }
    };
</script>

<div
    class="flex flex-1 flex-col justify-center flex-grow max-w-[30em] mx-auto p-6"
>
    <div
        class="flex flex-col bg-gray-900 bg-opacity-40 p-6 rounded-lg shadow-md space-y-4"
    >
        <h2 class="text-lg font-semibold text-white">Login</h2>

        {#if errorMessage}
            <p class="text-red-500 text-sm">{errorMessage}</p>
        {/if}

        <!-- Identifier Input -->
        <input
            type="text"
            class="w-full p-3 bg-transparent text-white text-sm border border-gray-700 rounded focus:outline-none"
            bind:value={identifier}
            placeholder="Username or Email"
        />

        <!-- Password Input -->
        <input
            type="password"
            class="w-full p-3 bg-transparent text-white text-sm border border-gray-700 rounded focus:outline-none"
            bind:value={password}
            placeholder="Password"
        />

        <!-- Submit Button -->
        <SubmitButton onClick={handleLogin}>Login</SubmitButton>

        <div class="text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <a
                class="text-blue-500 hover:underline cursor-pointer"
                href="/register"
            >
                Register
            </a>
        </div>
    </div>
</div>
