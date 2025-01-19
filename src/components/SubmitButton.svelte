<script lang="ts">
    export let onClick: (() => void) | null = null
</script>

<div class="flex justify-end p-4">
    <button
        class="px-6 py-2 
        bg-blue-500 text-white rounded-lg font-semibold 
        hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        on:click={onClick}
    >
        <slot />
    </button>
</div>
