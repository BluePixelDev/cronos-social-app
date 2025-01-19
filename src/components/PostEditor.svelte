<script lang="ts">
    import { marked } from "marked";
    import SubmitButton from "./SubmitButton.svelte";
    import CancelButton from "./CancelButton.svelte";

    let {
        postContent,
        onCancel,
        onSubmit,
    }: { data: any; postContent: string; onCancel: () => void, onSubmit:(value: string) => void } = $props();

</script>

<!-- Absolute wrapper -->
<div
    class="flex flex-col absolute top-0 bottom-0 right-0 left-0 items-center p-8 bg-black bg-opacity-60 z-20"
>
    <div
        class="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl h-4/5"
    >
        <!-- Markdown Editor -->
        <textarea
            class="flex-1 bg-gray-900 text-white text-sm p-4 rounded-lg leading-6 focus:outline-none resize-none"
            bind:value={postContent}
            placeholder="Type your Markdown here..."
            style="white-space: pre-wrap; overflow-wrap: break-word;"
        ></textarea>

        <!-- Markdown Preview -->
        <div
            class="flex-1 overflow-y-auto bg-gray-700 text-white text-sm p-4 rounded-lg leading-6 mt-4 markdown-preview"
        >
            {@html marked.parse(postContent)}
        </div>

        <div class="ml-auto flex">
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <SubmitButton onClick={() => onSubmit(postContent)}>Post</SubmitButton>
        </div>
    </div>
</div>
