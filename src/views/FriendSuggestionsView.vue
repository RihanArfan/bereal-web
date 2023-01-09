<script setup lang="ts">
import { RouterLink } from "vue-router";
import { vIntersectionObserver } from "@vueuse/components";

import type { PaginatedResults } from "@/types/types";
import type { FriendSuggestion } from "@/types/users";

const fetchFriendSuggestions = async ({ pageParam = "" }) =>
  await useApi()
    .get("relationships/suggestions", {
      searchParams: { page: pageParam ?? "" },
    })
    .json<PaginatedResults<FriendSuggestion>>();

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
} = useInfiniteQuery({
  queryKey: ["friend-suggestions"],
  queryFn: fetchFriendSuggestions,
  getNextPageParam: (lastPage) => lastPage.next,
});

const onIntersect = ([{ isIntersecting }]: { isIntersecting: boolean }[]) => {
  if (!isIntersecting) return;
  fetchNextPage();
};
</script>

<template>
  <h1 class="mb-1 text-sm font-bold uppercase text-zinc-400">
    People you may know
  </h1>

  <template v-if="isLoading">Loading</template>

  <span v-else-if="isError">Error: {{ error }}</span>

  <div v-if="data">
    <template v-for="(suggestions, index) in data.pages" :key="index">
      <RouterLink
        v-for="suggestion in suggestions.data"
        :key="suggestion.id"
        :to="{ name: 'profile', params: { username: suggestion.username } }"
        class="flex items-center rounded-lg py-2 transition-all hover:bg-zinc-900 hover:px-2"
      >
        <UserIcon
          :profile-picture="suggestion.profilePicture"
          :username="suggestion.username"
          :size="12"
        />
        <div class="ml-3">
          <p class="">{{ suggestion.fullname }}</p>
          <p class="text-sm font-semibold text-zinc-600">
            @{{ suggestion.username }}
          </p>
        </div>
      </RouterLink>
    </template>

    <template v-if="!hasNextPage">You've reached the end</template>

    <div v-if="hasNextPage" v-intersection-observer="onIntersect" />
  </div>
</template>
