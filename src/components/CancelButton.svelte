<script lang="ts">
    export let onClick: (() => void) | null = null
</script>

<div class="flex justify-end p-4">
    <button
        class="px-6 py-2 
        bg-red-500 text-white rounded-lg font-semibold 
        hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition-all duration-200"
        on:click={onClick}
    >
        <slot />
    </button>
</div>
