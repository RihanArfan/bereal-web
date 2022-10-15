<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRoute } from "vue-router";

dayjs.extend(relativeTime);

const accountStore = useAccountStore();
const route = useRoute();

const isMyProfile = computed(
  () => accountStore.account?.username === route.params.username
);

const {
  isLoading: isSearchLoading,
  isError: isSearchError,
  data: searchResults,
} = useSearchProfileQuery(route.params.username as string, {
  enabled: !isMyProfile.value,
});

const profileId = computed(() => {
  return searchResults.value!.data.find(
    (result) => result.username === route.params.username
  )!.id;
});

const isProfileReady = computed(() => {
  return typeof profileId.value !== "undefined";
});

const {
  isLoading,
  isError,
  data: profile,
  error,
} = useProfileQuery(profileId, {
  enabled: isProfileReady && !isMyProfile.value,
});
</script>

<template>
  <div
    class="h-48 rounded-b-lg bg-gray-400 bg-cover bg-center"
    :style="{
      'background-image': `url(${profile?.profilePicture?.url})`,
    }"
  >
    <div class="h-full rounded-b-lg backdrop-blur"></div>
  </div>
  <div class="relative -mt-24 flex flex-col items-center">
    <UserIcon
      :profile-picture="profile?.profilePicture"
      :username="profile?.username ?? route.params.username"
      :size="32"
      class="border-4 border-black transition-all hover:-mt-14 hover:h-64 hover:w-64 sm:delay-150"
    />

    <h1 class="mt-2 text-2xl font-semibold">
      <template v-if="isSearchLoading || isLoading">Loading...</template>
      <template v-else-if="isSearchError || isError || !profileId">
        Profile Not Found
      </template>
      <template v-else>{{ profile?.fullname }}</template>
    </h1>

    <div class="flex gap-1 text-sm font-semibold text-zinc-600">
      <a :href="`https://bere.al/${profile?.username}`" target="_blank">
        @{{ $route.params.username }}
      </a>
      <p v-if="profile?.createdAt">
        • Joined {{ dayjs(profile?.createdAt).fromNow() }}
      </p>
    </div>
    <p class="text-sm font-semibold text-zinc-600">{{ profile?.location }}</p>

    <p class="mt-1 mb-5">{{ profile?.biography }}</p>
    <p v-if="error" class="mt-1 mb-5">{{ error }}</p>

    {{ !isMyProfile }}
  </div>
</template>
