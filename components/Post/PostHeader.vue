<script setup lang="ts">
import type { Post } from "~/types/posts";
import { User } from "~/types/users";

const props = defineProps<{
  post: Post;
  user: User;
}>();

const timeAgo = useTimeAgo(props.post.takenAt);
</script>

<template>
  <div class="mb-1 flex items-center pl-1 pr-3">
    <NuxtLink
      :to="`/@${user.username}`"
      class="flex items-center rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-zinc-900"
    >
      <UserIcon
        :profile-picture="user.profilePicture"
        :username="user.username"
        class="mr-3"
      />

      <div>
        <p class="text-md font-medium leading-tight">
          {{ user.username }}
        </p>
      </div>
    </NuxtLink>

    <div
      class="ml-2 flex grow justify-end truncate text-sm font-medium text-gray-300"
    >
      <p :class="{ 'hidden sm:inline-block': !!post.isLate }">
        {{ timeAgo }}
      </p>

      <p v-if="post.isLate" class="flex sm:font-light ml-1">
        •
        {{ post.lateInSeconds }}s late
      </p>
    </div>
  </div>
</template>
