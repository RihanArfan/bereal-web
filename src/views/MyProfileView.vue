<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { isLoading, isError, data, error } = useMyProfileQuery();
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error: {{ error }}</p>
  <template v-if="data">
    <div
      class="mt-1 h-48 rounded-b-lg bg-gray-400 bg-cover bg-center"
      :style="{ 'background-image': `url(${data?.profilePicture?.url})` }"
    >
      <div class="h-full rounded-b-lg backdrop-blur"></div>
    </div>
    <div class="relative -mt-24 flex flex-col items-center">
      <UserIcon
        :profile-picture="data?.profilePicture"
        :username="data?.username"
        :size="32"
        class="border-4 border-black transition-all hover:-mt-10 hover:h-64 hover:w-64 sm:delay-150"
      />

      <h1 class="mt-2 text-2xl font-semibold">
        <template v-if="isLoading">Loading...</template>
        <template v-else-if="isError">Error loading profile</template>
        <template v-else>{{ data?.fullname }}</template>
      </h1>

      <div class="flex gap-1 text-sm font-semibold text-zinc-600">
        <a :href="`https://bere.al/${data?.username}`" target="_blank">
          @{{ data?.username }}
        </a>
        <p v-if="data?.createdAt">
          • Joined {{ dayjs(data?.createdAt).fromNow() }}
        </p>
      </div>
      <p class="text-sm font-semibold text-zinc-600">{{ data?.location }}</p>

      <p class="mt-1 mb-5">{{ data?.biography }}</p>
      <p v-if="error" class="mt-1 mb-5">{{ error }}</p>
    </div>

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
          v-for="realmoji in data?.realmojis"
          :key="realmoji.emoji"
          class="w-[calc(16.666667%_-_theme('gap.2'))]"
          :realmoji="realmoji"
        />
      </div>
    </div>
  </template>
</template>
