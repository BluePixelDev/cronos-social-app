<script lang="ts">
    import PostCard from "@components/PostCard.svelte";
    let { data } = $props();
    let posts = $state(data.posts);

    function handlePostDeleted(postId: number) {
        posts = posts.filter((post) => post.id !== postId);
    }
    $effect(() => {
        posts = data.posts;
    });
</script>

<svelte:head>
    <title>Cronos</title>
</svelte:head>

<div class={"flex flex-col gap-1"}>
    {#each posts as post}
        <PostCard
            username={post.username}
            date={post.createdAt}
            message={post.content}
            likes={post.likeCount}
            enableLikes={data.isAuthenticated}
            postId={post.id}
            liked={post.isLiked}
            isOwner={post.userId == data.user?.id}
            onDelete={handlePostDeleted}
        />
    {/each}
</div>
