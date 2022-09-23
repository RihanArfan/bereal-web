<script setup lang="ts">
import type { AccountRealmoji } from "@/types/types";

defineProps<{ realmoji: AccountRealmoji }>();
</script>

<template>
  <div class="flex">
    <img
      :src="realmoji.media.url"
      class="rounded-full inline-block"
      :alt="`${realmoji.emoji}`"
      :width="realmoji.media.width"
      :height="realmoji.media.height"
    />
    <div
      class="absolute w-10 h-10 text-2xl text-center font-bold text-white bg-zinc-100 rounded-full border-2 border-zinc-100"
    >
      {{ realmoji.emoji }}
    </div>
  </div>
</template>
