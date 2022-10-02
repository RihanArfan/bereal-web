<script setup lang="ts">
import { useQuery } from "vue-query";

import { useApi } from "@/composables/useApi";
import type { Friend } from "@/types/types";

const friendsListFetcher = async () =>
  await useApi().get("relationships/friends").json<{ data: Friend[] }>();

const fetchFriendsList = () => useQuery(["friends"], friendsListFetcher);
const { isLoading, isError, data, error } = fetchFriendsList();
</script>

<template>
  <h1 class="mb-1 text-sm font-bold uppercase text-zinc-400">
    My Friends
    <span v-if="data">({{ data.data.length }})</span>
  </h1>

  <template v-if="isLoading">Loading</template>

  <span v-else-if="isError">Error: {{ error }}</span>

  <template v-if="data">
    <router-link
      v-for="friend in data.data"
      :key="friend.id"
      :to="{
        name: 'profile',
        params: { username: friend.username },
      }"
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
    </router-link>
  </template>
</template>
