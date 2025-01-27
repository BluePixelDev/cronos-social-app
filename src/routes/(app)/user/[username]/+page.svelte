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

<div class="flex flex-col items-center p-8 rounded-lg shadow-lg bg-white w-full max-w-md mx-auto">
    <!-- Profile Picture Container with subtle border -->
    <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
        {#if profileData?.profilePicture}
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img
                src={profileData.profilePicture}
                alt="Profile picture"
                class="w-full h-full object-cover"
            />
        {:else}
            <div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {profileData.username[0].toUpperCase()}
            </div>
        {/if}
    </div>

    <!-- User Info with improved typography -->
    <h1 class="text-3xl font-bold mt-6 text-gray-800">
        {profileData?.username || "Unknown User"}
    </h1>

    <!-- Followers count with better visual hierarchy -->
    <p class="text-blue-600 font-medium text-sm mt-2">
        {followCount} Followers
    </p>

    <!-- Editable Bio with improved styling -->
    {#if isOwnProfile && isEditingBio}
        <div class="w-full mt-4">
            <textarea
                class="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                bind:value={bio}
                rows="3"
                placeholder="Write something about yourself..."
            ></textarea>
            <div class="flex space-x-3 mt-3">
                <button
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors font-medium"
                    onclick={saveBio}
                >
                    Save
                </button>
                <button
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors font-medium"
                    onclick={() => (isEditingBio = false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    {:else}
        <div class="mt-4 text-center px-4">
            <p class="text-gray-700 leading-relaxed">
                {profileData?.bio || "No bio available"}
                {#if isOwnProfile}
                    <button
                        class="ml-2 text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                        onclick={() => (isEditingBio = true)}
                    >
                        Edit
                    </button>
                {/if}
            </p>
        </div>
    {/if}

    <!-- Follow Button with improved styling -->
    {#if !isOwnProfile}
        <button
            class="mt-6 px-8 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 font-medium"
            onclick={toggleFollow}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    {/if}
</div>