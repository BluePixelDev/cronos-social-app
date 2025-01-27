<script lang="ts">
    import { goto } from "$app/navigation";
    let { status, message } = $props();

    // Default values if props are not provided
    status = status || 404;
    message = message || "The page you are looking for could not be found.";

    const goHome = () => {
        goto("/");
    };
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
    <!-- Error Status Code -->
    <div class="text-blue-600 text-9xl font-bold">{status}</div>

    <!-- Error Message -->
    <h1 class="text-2xl font-semibold mt-4 text-center">{message}</h1>

    <!-- Subtext -->
    <p class="text-gray-600 mt-2 text-center max-w-lg">
        It seems like the page you were looking for doesn’t exist or an error occurred. 
        Please check the URL or try again later.
    </p>

    <!-- Buttons for user navigation -->
    <div class="mt-6 flex space-x-4">
        <button
            class="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 font-medium"
            onclick={goHome}
        >
            Go to Homepage
        </button>
        <button
            class="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-all transform hover:scale-105 font-medium"
            onclick={() => window.history.back()}
        >
            Go Back
        </button>
    </div>
</div>