<script lang="ts">
    import Icon from "@iconify/svelte";
    import { marked } from "marked";
    export let message = "Testing!";
    export let user = "Username";
    export let date = new Date();
    export let likes = 15;
    export let liked = false;

    const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const toggleLike = () => {
        liked = !liked;
        likes += liked ? 1 : -1;
    };
</script>

<div class="bg-slate-400 bg-opacity-10 p-6 mx-auto w-[30rem]">
    <header class="flex items-center justify-between mb-4">
        <!-- User Info -->
        <div class="flex items-center space-x-3">
            <div
                class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold"
            >
                {user.charAt(0).toUpperCase()}
            </div>
            <div>
                <p class="text-green-300 font-semibold">{user}</p>
                <p class="text-gray-400 text-sm" title={date.toISOString()}>
                    {formattedDate}
                </p>
            </div>
        </div>
    </header>

    <article class="max-w-none text-sm leading-6 markdown-preview">
        <!-- Markdown Content -->
        {@html marked.parse(message)}
    </article>

    <!-- Interaction Menu -->
    <div class="border-t border-separator text-gray-500">
        <button
            class="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-red-500"
            on:click={toggleLike}
        >
            {#if liked}
                <Icon icon="solar:heart-bold" />
            {:else}
                <Icon icon="solar:heart-outline" />
            {/if}

            {likes}
        </button>
    </div>
</div>
