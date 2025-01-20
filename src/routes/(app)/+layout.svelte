<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import PostEditor from "@src/components/PostEditor.svelte";
    import Header from "@src/components/layout/Header.svelte";
    import Sidebar from "@src/components/layout/LayoutSidebar.svelte";
    import { post } from "@src/lib/util/requstUtil.js";
    import { isPostEditorOpen } from "@stores/postEditorStore";

    let { children, data } = $props();

    let isOpen = $state(false);
    isPostEditorOpen.subscribe((state) => {
        isOpen = state;
    });

    const handleEditorClose = () => {
        isPostEditorOpen.set(false);
    };

    const handlePostSubmit = async (content: string) => {
        if (data.isAuthenticated && data.user) {
            const newPost = await post(content);
            if (newPost && newPost.success === true) {
                await invalidateAll();
            }
            isPostEditorOpen.set(false);
        }
    };
</script>

<div class="flex flex-col min-h-screen bg-background">
    <!-- Main Content Area -->
    <div class="flex flex-1 relative">
        <Sidebar {data} />
        <div class="flex flex-col flex-1 relative">
            {#if isOpen}
                <PostEditor
                    onCancel={handleEditorClose}
                    {data}
                    postContent=""
                    onSubmit={handlePostSubmit}
                />
            {/if}
            <!-- Header -->
            <Header />
            <main class="flex flex-1 flex-col p-10">
                {@render children()}
            </main>
        </div>
    </div>
</div>
