<script lang="ts">
    import PostCard from "@components/PostCard.svelte";
    let value = $state("");
    let { data } = $props();
</script>

<svelte:head>
    <title>FAQ</title> 
</svelte:head>

<div class={"flex flex-col gap-1"}>
    {#each data.posts as post}
    <PostCard user={post.username} date={post.createdAt} message={post.content} likes={post.likeCount}/>
    {/each}
</div>
