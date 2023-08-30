<script setup lang="ts">
import type { Post } from "~/types/posts";
import { User } from "~/types/users";

const props = defineProps<{
  post: Post;
  user: User;
}>();

const timeAgo = useTimeAgo(props.post.takenAt);
const lateDuration = useLateDuration(
  new Date(props.post.takenAt),
  props.post.lateInSeconds
);
</script>

<template>
  <div class="mb-2 flex items-center pl-1 pr-3">
    <NuxtLink :to="`/@${user.username}`" class="flex items-center pr-3">
      <UAvatar
        :src="user.profilePicture?.url"
        :alt="user.username"
        size="md"
        draggable="false"
      />

      <div class="ml-3">
        <p class="text-md font-medium leading-tight">
          {{ user.username }}
        </p>

        <p
          v-if="post.location || post.isLate"
          class="truncate text-xs text-gray-500"
        >
          <span v-if="post.location && isLocationLoading">...</span>
          <template v-else-if="post.location">
            {{ location }} United Kingdom
          </template>

          <span v-if="post.location && post.isLate"> • </span>
          <span v-if="post.isLate" class="inline-flex">
            {{ lateDuration?.number }}
            <span
              class="max-w-[1ch] lg:max-w-none overflow-hidden whitespace-nowrap mr-1 lg:mr-0.5 lg:ml-0.5"
            >
              {{ lateDuration?.unit }}
            </span>
            late
          </span>
        </p>
      </div>
    </NuxtLink>

    <div
      class="ml-2 flex grow justify-end truncate text-sm font-medium text-gray-300"
    >
      <p :class="{ 'hidden sm:inline-block': post.isLate }">
        {{ timeAgo }}
      </p>
    </div>
  </div>
</template>
