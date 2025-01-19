<script lang="ts">
    export let goto: string | null = null;
    export let onClick: (() => void) | null = null;
</script>

<a
    class="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-500 whitespace-nowrap inline-block cursor-pointer"
    href={goto}
    onclick={onClick}
>
    <slot />
</a>
