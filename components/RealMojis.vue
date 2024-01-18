<script setup lang="ts">
import type { RealMoji } from "~/types/posts";

export interface Props {
  realMojis: RealMoji[];
  size?: "base" | "xs" | "sm" | "lg";
}

withDefaults(defineProps<Props>(), {
  size: "sm",
});
</script>

<template>
  <div class="flex">
    <Avatar
      v-for="realMoji in realMojis.slice(0, 5)"
      :key="realMoji.id"
      class="ring-2 ring-black -mr-1"
      :size="size"
    >
      <AvatarImage :src="realMoji.media.url" :alt="realMoji.user.username" />
      <AvatarFallback>
        {{ realMoji.user.username.slice(0, 1) }}
      </AvatarFallback>
    </Avatar>

    <Avatar v-if="realMojis.length > 4">
      <AvatarFallback>+{{ realMojis.length - 4 }}</AvatarFallback>
    </Avatar>
  </div>
</template>
