<script setup lang="ts">
import type { Post } from "@/types/types";
defineProps<{ user: Post["user"] }>();
</script>

<template>
  <img
    v-if="user.profilePicture"
    class="h-10 w-10 rounded-full"
    :src="user.profilePicture?.url"
    :width="user.profilePicture.width"
    :height="user.profilePicture.height"
    :alt="`${user.username}'s profile picture`"
  />

  <div
    v-else
    class="h-10 w-10 rounded-full bg-gray-400 text-black font-bold items-center justify-center flex"
  >
    {{ user.username.charAt(0).toUpperCase() }}
  </div>
</template>
