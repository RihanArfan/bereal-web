<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Post } from "@/types/posts";
const props = defineProps<{ post: Post }>();

dayjs.extend(duration);
dayjs.extend(relativeTime);

const { isLoading: isLocationLoading, data } = useLocationQuery(
  props.post.location?.latitude!,
  props.post.location?.longitude!,
  { enabled: !!props.post.location }
);

const location = computed(
  () => `${data.value?.address.locality}, ${data.value?.address.countryRegion}`
);

const humanLateTime = computed(() =>
  dayjs.duration(props.post.lateInSeconds, "s").humanize()
);
</script>

<template>
  <div class="mb-1 flex items-center pr-3 pl-1">
    <RouterLink
      class="flex items-center rounded-lg py-1 px-2 transition-colors duration-200 hover:bg-zinc-900"
      :to="{ name: 'profile', params: { username: post.user.username } }"
    >
      <UserIcon
        :profile-picture="post.user.profilePicture"
        :username="post.user.username"
        class="mr-3"
      />

      <div>
        <p class="text-md font-medium leading-tight">
          {{ post.user.username }}
        </p>

        <p v-if="post.location" class="truncate text-xs text-gray-500">
          <span v-if="isLocationLoading">...</span>
          <template v-else>{{ location }}</template>
        </p>
      </div>
    </RouterLink>

    <div
      class="ml-2 flex grow justify-end truncate text-sm font-medium text-gray-300"
    >
      <p :class="{ 'hidden sm:inline-block': !!post.lateInSeconds }">
        {{ dayjs(post.takenAt).fromNow() }}
      </p>

      <p v-if="post.lateInSeconds" class="flex sm:font-light">
        <span class="ml-1 hidden sm:inline">(</span>
        {{ humanLateTime }} late
        <span class="hidden sm:inline">)</span>
      </p>
    </div>
  </div>
</template>
