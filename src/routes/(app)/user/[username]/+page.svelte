<script lang="ts">
    import { follow, unfollow, updateBio } from "@src/lib/util/requstUtil";

    let { data } = $props();
    const { isAuthenticated, profileData } = data;

    let followCount = $state(profileData?.followCount || 0);
    let isFollowing = $state(data.profileData.isFollowed);
    const isOwnProfile = isAuthenticated && data.user?.id === profileData?.id;

    let isEditingBio = $state(false);
    let bio = $state(profileData?.bio || "");

    const toggleFollow = async () => {
        if (!isAuthenticated) {
            alert("You need to log in to follow this user.");
            return;
        }

        const response = isFollowing
            ? await unfollow(profileData.id)
            : await follow(profileData.id);

        if (response?.success) {
            isFollowing = !isFollowing;
            followCount += isFollowing ? 1 : -1;
        }
    };

    const saveBio = async () => {
        const response = await updateBio(bio);
        if (response?.success) {
            profileData.bio = bio; // Ensure bio updates properly.
            isEditingBio = false;
        } else {
            alert("Failed to update bio. Please try again.");
        }
    };
</script>

<div
    class="flex flex-col items-center p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
>
    <!-- Profile Picture -->
    <div
        class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl font-bold"
    >
        {#if profileData?.profilePicture}
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img
                src={profileData.profilePicture}
                alt="Profile picture"
                class="w-full h-full rounded-full object-cover"
            />
        {:else}
            {profileData.username[0].toUpperCase()}
        {/if}
    </div>

    <!-- User Info -->
    <h1 class="text-2xl font-semibold mt-4">
        {profileData?.username || "Unknown User"}
    </h1>

    <!-- Editable Bio -->
    {#if isOwnProfile && isEditingBio}
        <textarea
            class="mt-2 w-full p-2 border text-black rounded-md"
            bind:value={bio}
        ></textarea>
        <div class="flex space-x-2 mt-2">
            <button
                class="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                onclick={saveBio}
            >
                Save
            </button>
            <button
                class="px-4 py-2 bg-gray-400 text-white rounded-md shadow hover:bg-gray-500 transition"
                onclick={() => (isEditingBio = false)}
            >
                Cancel
            </button>
        </div>
    {:else}
        <p class="text-gray-600 text-sm mt-2">
            {profileData?.bio || "No bio available"}
            {#if isOwnProfile}
                <button
                    class="ml-2 text-blue-600 hover:underline"
                    onclick={() => (isEditingBio = true)}
                >
                    Edit
                </button>
            {/if}
        </p>
    {/if}

    <p class="text-gray-500 text-sm mt-1">Followers: {followCount}</p>

    <!-- Follow Button -->
    {#if !isOwnProfile}
        <button
            class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            onclick={toggleFollow}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    {/if}
</div>
