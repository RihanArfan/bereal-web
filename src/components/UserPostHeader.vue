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
  () => `${data.value?.address.city}, ${data.value?.address.country}`
);
</script>

<template>
  <div class="flex items-center mb-2 px-3">
    <UserIcon :user="post.user" />

    <div class="grow ml-3">
      <p class="text-md font-medium leading-tight">
        {{ post.user.username }}
      </p>

      <p v-if="post.location" class="text-xs text-gray-500">
        <span v-if="isLocationLoading">...</span>
        {{ location }}
      </p>
    </div>

    <p class="justify-self-end truncate text-sm ml-1 text-gray-300">
      {{ dayjs(post.takenAt._seconds * 1000).fromNow() }}

      <span v-if="post.lateInSeconds">
        ({{ dayjs.duration(post.lateInSeconds, "s").humanize() }} late)
      </span>
    </p>
  </div>
</template>
