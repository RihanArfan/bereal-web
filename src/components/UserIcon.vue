<script setup lang="ts">
import type { ProfilePicture } from "@/types/types";
defineProps<{ profilePicture?: ProfilePicture; username: string }>();
</script>

<template>
  <img
    v-if="profilePicture"
    class="h-10 w-10 rounded-full"
    :src="profilePicture?.url"
    :width="profilePicture.width"
    :height="profilePicture.height"
    :alt="`${username}'s profile picture`"
  />

  <div
    v-else
    class="h-10 w-10 rounded-full bg-gray-400 text-black font-bold items-center justify-center flex"
  >
    {{ username.charAt(0).toUpperCase() }}
  </div>
</template>
