<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Post } from "@/types/types";
import { useLocationQuery } from "@/composables/queries";

const props = defineProps<{ post: Post }>();

dayjs.extend(duration);
dayjs.extend(relativeTime);

const { isLoading: isLocationLoading, data } = useLocationQuery(
  props.post.location?._latitude || 0,
  props.post.location?._longitude || 0,
  { enabled: !!props.post.location }
);

const location = computed(
  () =>
    `${data.value?.address.town ?? data.value?.address.city}, ${
      data.value?.address.country
    }`
);

const humanLateTime = computed(() =>
  dayjs.duration(props.post.lateInSeconds, "s").humanize()
);
</script>

<template>
  <div class="flex items-center mb-2 px-3">
    <UserIcon
      :profile-picture="post.user.profilePicture"
      :username="post.userName"
    />

    <div class="grow ml-3">
      <p class="text-md font-medium leading-tight">
        {{ post.user.username }}
      </p>

      <p v-if="post.location" class="text-xs text-gray-500 truncate">
        <span v-if="isLocationLoading">...</span>
        <template v-else>{{ location }}</template>
      </p>
    </div>

    <div
      class="justify-self-end flex truncate text-sm font-medium ml-2 text-gray-300"
    >
      <p :class="{ 'hidden sm:inline-block': !!post.lateInSeconds }">
        {{ dayjs(post.takenAt._seconds * 1000).fromNow() }}
      </p>

      <p v-if="post.lateInSeconds" class="flex sm:font-light">
        <span class="hidden sm:inline ml-1">(</span>
        {{ humanLateTime }} late
        <span class="hidden sm:inline">)</span>
      </p>
    </div>
  </div>
</template>
