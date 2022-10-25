<script setup lang="ts">
import type { Picture } from "@/types/types";

const props = defineProps<{
  primary: Picture;
  secondary: Picture;
  username: string;
}>();

const isSecondaryLarge = ref(false);

const imageUrl = (primary: boolean) =>
  primary ? props.primary.url : props.secondary.url;

const alt = (primary: boolean) =>
  primary
    ? `${props.username}'s photo'`
    : `${props.username}'s secondary photo`;
</script>

<template>
  <div class="relative">
    <img
      :src="imageUrl(!isSecondaryLarge)"
      class="rounded-xl bg-zinc-900"
      :alt="alt(!isSecondaryLarge)"
      loading="lazy"
      :width="primary.width"
      :height="primary.height"
    />

    <img
      class="absolute top-0 left-0 mt-3 ml-3 w-1/3 cursor-pointer rounded-xl border-2 border-black bg-zinc-800"
      :src="imageUrl(isSecondaryLarge)"
      :alt="alt(isSecondaryLarge)"
      loading="lazy"
      :width="secondary.width"
      :height="secondary.height"
      @click="isSecondaryLarge = !isSecondaryLarge"
    />

    <slot name="footer" />
  </div>
</template>
