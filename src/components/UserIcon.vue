<script setup lang="ts">
import type { ProfilePicture } from "@/types/types";

const props = defineProps<{
  profilePicture?: ProfilePicture;
  username: string;
  size?: 8 | 10 | 16 | 20 | 24 | 32;
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case 8:
      return "w-8 h-8";
    case 16:
      return "w-16 h-16";
    case 20:
      return "w-20 h-20";
    case 24:
      return "w-24 h-24";
    case 32:
      return "w-32 h-32";
    default:
      return "w-10 h-10";
  }
});
</script>

<template>
  <img
    v-if="profilePicture"
    class="rounded-full"
    :class="sizeClass"
    :src="profilePicture?.url"
    :width="profilePicture.width"
    :height="profilePicture.height"
    :alt="`${username}'s profile picture`"
  />

  <div
    v-else
    class="rounded-full bg-gray-400 text-black font-bold items-center justify-center flex"
    :class="sizeClass"
  >
    {{ username.charAt(0).toUpperCase() }}
  </div>
</template>
