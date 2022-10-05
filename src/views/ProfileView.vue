<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { storeToRefs } from "pinia";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";

import { useApi, useApiFunction } from "@/composables/useApi";
import { useAccountStore } from "@/stores/account";
import type { Profile } from "@/types/types";
import type { GetUserProfile } from "@/types/functions";

dayjs.extend(relativeTime);

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

const route = useRoute();

const isMyProfile = computed(
  () =>
    account.value?.username && account.value?.username === route.params.username
);

const profileFetcher = async () => {
  // TODO: find user ID from cache of vue query before checking function
  const user = await useApiFunction()
    .post("getUserProfile", {
      json: { data: { userName: route.params.username } },
    })
    .json<GetUserProfile>();

  return await useApi()
    .get(`person/profiles/${user.result.uid}`)
    .json<Profile>();
};

const fetchProfile = () =>
  useQuery(["profile", route.params.username], profileFetcher, {
    enabled: !isMyProfile.value,
  });
const { isLoading, isError, data, error } = fetchProfile();

const profile = computed(() => {
  if (isMyProfile.value) return account.value;
  return data.value;
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
      <template v-if="isLoading && !isMyProfile">Loading...</template>
      <template v-else-if="isError">Profile Not Found</template>
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
  </div>

  <template v-if="account?.username === $route.params.username">
    <div class="mb-3 rounded-lg bg-zinc-900 p-3">
      <div class="mb-1 flex justify-between">
        <h2 class="mb-2 text-lg font-semibold">Memories</h2>
        <p class="mt-1 text-xs text-zinc-600">Only visible to you</p>
      </div>

      <MyMemories />
    </div>

    <div class="rounded-lg bg-zinc-900 p-3">
      <div class="mb-1 flex justify-between">
        <h2 class="mb-2 text-lg font-semibold">RealMojis</h2>
        <p class="mt-1 text-xs text-zinc-600">Only visible to you</p>
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
</template>
