<script setup lang="ts">
import { useInfiniteQuery } from "@tanstack/vue-query";
import { useIntersectionObserver } from "@vueuse/core";

import { useApi } from "@/composables/useApi";
import type { DiscoveryPost } from "@/types/posts";

const friendsFeedFetcher = async ({ pageParam = "" }) =>
  await useApi()
    .get("feeds/discovery", { searchParams: { lastIndex: pageParam } })
    .json<{ posts: DiscoveryPost[]; lastIndex: string }>();

const fetchDiscoveryFeed = () =>
  useInfiniteQuery(["discovery-feed"], friendsFeedFetcher, {
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    getNextPageParam: (lastPage) => lastPage.lastIndex,
  });
const { isLoading, isError, isFetchingNextPage, data, error, fetchNextPage } =
  fetchDiscoveryFeed();

const el = ref<HTMLElement | null>(null);
useIntersectionObserver(el, () => fetchNextPage(), { threshold: 1 });
</script>

<template>
  <template v-if="isLoading && !isFetchingNextPage">
    <SkeletonUserPost v-for="x in 5" :key="x" class="mb-5" />
  </template>

  <span v-else-if="isError">Error: {{ error }}</span>

  <template v-if="data">
    <div v-for="(posts, index) in data.pages" :key="index">
      <UserPost
        v-for="post in posts.posts"
        :key="post.id"
        :post="post"
        class="mb-5"
      />
    </div>

    <template v-if="isFetchingNextPage">
      <SkeletonUserPost v-for="x in 3" :key="x" class="mb-5" />
    </template>

    <button
      ref="el"
      class="mb-3 block w-full rounded bg-white py-1 font-semibold text-black hover:bg-gray-200"
      @click="() => fetchNextPage()"
    >
      Load More
    </button>
  </template>
</template>
