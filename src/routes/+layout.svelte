<script lang="ts">
    import "../app.css";
    import "@fontsource-variable/source-code-pro";
    let { children } = $props();
</script>

{@render children()}

<style lang="postcss">
    :global(html) {
        color: white;
        font-family: theme(fontFamily.code);
        background-color: theme(colors.background)
    }
</style>
