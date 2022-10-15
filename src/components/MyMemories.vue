<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import { useApi } from "@/composables/useApi";
import type { Results } from "@/types/types";
import type { Memory } from "@/types/memories";

const memoriesFetcher = async () =>
  await useApi().get("feeds/memories?limit=14").json<Results<Memory>>();

const fetchMemoriesFeed = () =>
  useQuery(["memories"], memoriesFetcher, {
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
  });
const { isLoading, isError, data: memories, error } = fetchMemoriesFeed();
</script>

<template>
  <div class="grid grid-cols-7 gap-2">
    <div
      v-for="memory in memories?.data.slice().reverse()"
      :key="memory.id"
      class="relative"
    >
      <img
        :src="memory.thumbnail?.url"
        :alt="`Memory ${memory.memoryDay}`"
        :width="memory.thumbnail?.width"
        :height="memory.thumbnail?.height"
        class="rounded-lg"
      />

      <div class="absolute inset-0 flex items-center justify-center">
        <p class="text-2xl font-bold text-white">
          {{ memory.memoryDay.split("-")[2] }}
        </p>
      </div>
    </div>
  </div>
</template>
