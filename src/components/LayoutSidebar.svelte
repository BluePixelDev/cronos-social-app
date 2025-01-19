<script lang="ts">
    import { isPostEditorOpen } from "@stores/postEditorStore";
    import { logout } from "@src/lib/util/authUtil";
    import SideBarButton from "./SideBarButton.svelte";
    import { goto } from "$app/navigation";
    let { data } = $props();

    const handleNewPost = () => {
        if (!data.isAuthenticated) {
            goto("/login");
            return;
        }
        isPostEditorOpen.set(true);
    };
</script>

<div
    class="w-[16em] bg-header p-5 border-r border-separator bg-sidebar text-white flex flex-col justify-between h-screen sticky left-0 top-0"
>
    <!-- Top Section: Logo or App Name -->
    <div>
        <h1 class="text-xl font-bold mb-6">Crono</h1>

        <!-- Navigation Links -->
        <nav class="space-y-4">
            <SideBarButton onClick={handleNewPost}>📝 New Post</SideBarButton>
            <SideBarButton goto="/">🏠 Home</SideBarButton>

            <!-- Show Profile and Advanced Links Only If Authenticated -->
            {#if data.isAuthenticated}
                <SideBarButton goto="/profile">👤 Profile</SideBarButton>
            {/if}
        </nav>
    </div>

    <!-- Bottom Section: Settings & Logout -->
    <div>
        <nav class="space-y-4">
            <!-- Show Settings and Logout Only If Authenticated -->
            {#if data.isAuthenticated}
                <SideBarButton goto="/settings">⚙️ Settings</SideBarButton>
                <SideBarButton onClick={logout}>🚪 Logout</SideBarButton>
            {:else}
                <SideBarButton goto="/login">📌 Login</SideBarButton>
            {/if}
        </nav>
    </div>
</div>
