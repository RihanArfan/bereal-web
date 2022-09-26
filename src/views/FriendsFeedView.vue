<script setup lang="ts">
import { useQuery } from "vue-query";

import { useAuthStore } from "@/stores/auth";
import { useApi } from "@/composables/useApi";
import type { Post } from "@/types/types";

const authStore = useAuthStore();

const friendsFeedFetcher = async (): Promise<Post[]> =>
  await useApi().get("feeds/friends").json<Post[]>();

const fetchFriendsFeed = () => useQuery(["friends-feed"], friendsFeedFetcher);
const { isLoading, isError, data, error } = fetchFriendsFeed();

const myPost = computed(() =>
  data.value?.find(({ user }) => user.id === authStore.userId)
);
const othersPosts = computed(() =>
  data.value?.filter(({ user }) => user.id !== authStore.userId)
);
</script>

<template>
  <template v-if="isLoading">
    <SkeletonMyPost :small="true" class="mb-5" />
    <SkeletonUserPost v-for="x in 3" :key="x" class="mb-5" />
  </template>

  <span v-else-if="isError">Error: {{ error }}</span>

  <template v-if="data">
    <MyPost v-if="myPost" :post="myPost" :small="true" class="mb-5" />

    <UserPost
      v-for="post in othersPosts"
      :key="post.id"
      :post="post"
      class="mb-5"
    />
  </template>
</template>
