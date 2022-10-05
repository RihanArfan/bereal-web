<script setup lang="ts">
import { useQuery } from "vue-query";

import { useApi } from "@/composables/useApi";
import type { Friend } from "@/types/types";

const incomingFriendListFetcher = async () =>
  await useApi()
    .get("relationships/friend-requests/received")
    .json<{ data: Friend[] }>();

const fetchIncomingFriendsList = () =>
  useQuery(["friend-requests-incoming"], incomingFriendListFetcher);
const { isError, data: incoming, error } = fetchIncomingFriendsList();
</script>

<template>
  <h1 class="mb-1 text-sm font-bold uppercase text-zinc-400">
    Friend Requests
  </h1>

  <span v-if="isError">Error: {{ error }}</span>

  <template v-if="incoming?.data.length">
    <RouterLink
      v-for="friend in incoming.data"
      :key="friend.id"
      :to="{ name: 'profile', params: { username: friend.username } }"
      class="flex items-center rounded-lg py-2 transition-all hover:bg-zinc-900 hover:px-2"
    >
      <UserIcon
        :profile-picture="friend.profilePicture"
        :username="friend.username"
        :size="14"
      />
      <div class="ml-3">
        <p class="">{{ friend.fullname }}</p>
        <p class="text-sm font-semibold text-zinc-600">
          @{{ friend.username }}
        </p>
      </div>
    </RouterLink>
  </template>

  <div v-else class="mt-2 rounded-lg bg-zinc-900 px-3 py-5 text-center">
    <p class="mb-1 font-bold">No pending requests</p>
    <p class="text-sm">You don't have any pending requests</p>
  </div>
</template>
