<script lang="ts">
    export let classNames = "";
    export let onClick: (() => void) | null = null
</script>

<button
    class={"rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 pr-10 pl-10 pt-5 pb-5 w-min flex justify-center items-center text-white font-bold cursor-pointer shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl active:scale-95 " +
        classNames}
        on:click={onClick}
        tabindex="-1"
>
    <slot />
</button>
