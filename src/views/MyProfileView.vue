<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { storeToRefs } from "pinia";
import { useQuery } from "vue-query";

import { useAccountStore } from "@/stores/account";
import { useApi } from "@/composables/useApi";
import type { Memories } from "@/types/types";

dayjs.extend(relativeTime);

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

const memoriesFetcher = async () =>
  await useApi().get("feeds/memories?limit=14").json<Memories>();

const fetchFriendsFeed = () =>
  useQuery(["memories"], memoriesFetcher, {
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
  });
const { isLoading, isError, data: memories, error } = fetchFriendsFeed();
</script>

<template>
  <div
    class="h-48 bg-cover bg-center rounded-b-lg"
    :class="{ 'bg-gray-400': !account?.profilePicture }"
    :style="{
      'background-image': `url(${account?.profilePicture?.url})`,
    }"
  >
    <div class="backdrop-blur h-full rounded-b-lg"></div>
  </div>
  <div class="flex flex-col items-center relative -mt-24">
    <UserIcon
      :profile-picture="account?.profilePicture"
      :username="account?.username ?? ' '"
      :size="32"
      class="border-4 border-black"
    />

    <h1 class="text-2xl font-semibold">
      {{ account?.fullname }}
    </h1>

    <div class="flex gap-1 text-zinc-600 font-semibold text-sm">
      <a :href="`https://bere.al/${account?.username}`" target="_blank">
        @{{ account?.username }}
      </a>
      <p v-if="account?.location">• {{ account?.location }}</p>
      <p>• Joined {{ dayjs(account?.createdAt).fromNow() }}</p>
    </div>

    <p class="mt-1 mb-3">{{ account?.biography }}</p>
  </div>

  <div class="bg-zinc-900 p-3 rounded-lg mb-3">
    <div class="flex justify-between mb-1">
      <h2 class="font-semibold text-lg mb-2">Memories</h2>
      <p class="text-xs text-zinc-600 mt-1">Only visible to you</p>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="memory in memories?.data.slice().reverse()"
        :key="memory.id"
        class="relative"
      >
        <img
          :src="memory.thumbnail.url"
          :alt="`Memory ${memory.memoryDay}`"
          :width="memory.thumbnail.width"
          :height="memory.thumbnail.height"
          class="rounded-lg"
        />

        <!-- put memoryDay in center in front of memory-->

        <div class="absolute inset-0 flex items-center justify-center">
          <p class="text-2xl font-bold text-white">
            {{ memory.memoryDay.split("-")[2] }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-zinc-900 p-3 rounded-lg">
    <div class="flex justify-between mb-1">
      <h2 class="font-semibold text-lg mb-2">RealMojis</h2>
      <p class="text-xs text-zinc-600 mt-1">Only visible to you</p>
    </div>

    <div class="flex flex-wrap justify-center gap-2">
      <RealmojiWithIcon
        v-for="realmoji in account?.realmojis"
        :key="realmoji.emoji"
        class="w-[calc(16.666667%_-_theme('gap.2'))]"
        :realmoji="realmoji"
      />
    </div>
  </div>
</template>
