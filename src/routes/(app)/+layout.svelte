<script lang="ts">
    import PostEditor from "@src/components/PostEditor.svelte";
    import Header from "@components/Header.svelte";
    import Sidebar from "@src/components/LayoutSidebar.svelte";
    import { isPostEditorOpen } from "@stores/postEditorStore";
    import { post } from "@util/postUtil";

    let { children, data } = $props();

    let isOpen = $state(false)
    isPostEditorOpen.subscribe((state) => {
        isOpen = state;
    })

    const handleEditorClose = () => {
        isPostEditorOpen.set(false)
    }

    const handlePostSubmit = (content: string) => {
        if(data.isAuthenticated && data.user){
            post(content, data.user?.id)
            isPostEditorOpen.set(false)
        }
    }
</script>

<div class="flex flex-col min-h-screen bg-background">
    <!-- Main Content Area -->
    <div class="flex flex-1 relative">
        <Sidebar {data} />
        <div class="flex flex-col flex-1 relative">
            {#if isOpen}
                <PostEditor onCancel={handleEditorClose} data={data} postContent="" onSubmit={handlePostSubmit}/>
            {/if}
            <!-- Header -->
            <Header />
            <main class="flex flex-1 flex-col p-10">
                {@render children()}
            </main>
        </div>
    </div>
</div>
