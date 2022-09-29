<script setup lang="ts">
import { useInfiniteQuery } from "vue-query";
import { useInfiniteScroll } from "@vueuse/core";

import { useApi } from "@/composables/useApi";
import type { Post } from "@/types/types";

const friendsFeedFetcher = async () =>
  await useApi().get("feeds/discovery").json<{ posts: Post[] }>();

const fetchDiscoveryFeed = () =>
  useInfiniteQuery(["discovery-feed"], friendsFeedFetcher, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.posts.at(-1)?.id,
  });
const { isLoading, isError, isFetchingNextPage, data, error, fetchNextPage } =
  fetchDiscoveryFeed();

const el = ref<HTMLElement | null>(null);
useInfiniteScroll(
  el,
  () => {
    console.info("Loading more discovery");
    fetchNextPage();
  },
  { distance: 10 }
);
</script>

<template>
  <div ref="el">
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
        class="mb-3 block w-full rounded bg-white py-1 font-semibold text-black hover:bg-gray-200"
        @click="() => fetchNextPage()"
      >
        Load More
      </button>
    </template>
  </div>
</template>
