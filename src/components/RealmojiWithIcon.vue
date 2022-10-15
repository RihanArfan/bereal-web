<script setup lang="ts">
import type { Realmoji } from "@/types/realmojis";

defineProps<{ realmoji: Realmoji }>();
</script>

<template>
  <div class="flex">
    <img
      :src="realmoji.media.url"
      class="inline-block rounded-full"
      :alt="`${realmoji.emoji}`"
      :width="realmoji.media.width"
      :height="realmoji.media.height"
    />
    <div
      class="absolute h-7 w-7 rounded-full border-2 border-zinc-100 bg-zinc-100 text-center text-sm font-bold text-white"
    >
      {{ realmoji.emoji }}
    </div>
  </div>
</template>
