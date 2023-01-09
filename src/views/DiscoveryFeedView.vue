<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components";

import type { DiscoveryPost } from "@/types/posts";

const friendsFeedFetcher = async ({ pageParam = "" }) => {
  const data = await useApi()
    .get("feeds/discovery", { searchParams: { lastIndex: pageParam } })
    .json<{ posts: DiscoveryPost[]; lastIndex: string }>();
  return { posts: data.posts.map(feedToPost), lastIndex: data.lastIndex };
};

const fetchDiscoveryFeed = () =>
  useInfiniteQuery(["discovery-feed"], friendsFeedFetcher, {
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    getNextPageParam: (lastPage) => lastPage.lastIndex,
  });
const { isLoading, isError, isFetchingNextPage, data, error, fetchNextPage } =
  fetchDiscoveryFeed();

const onIntersect = ([{ isIntersecting }]: { isIntersecting: boolean }[]) => {
  if (!isIntersecting) return;
  fetchNextPage();
};
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

    <div v-intersection-observer="onIntersect" />
  </template>
</template>
