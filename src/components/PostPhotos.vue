<script setup lang="ts">
const props = defineProps<{
  primaryPhoto: {
    url: string;
    height: number;
    width: number;
  };
  secondaryPhoto: {
    url: string;
    height: number;
    width: number;
  };
  username: string;
}>();

const isSecondaryLarge = ref(false);

const imageUrl = (primary: boolean) =>
  primary ? props.primaryPhoto.url : props.secondaryPhoto.url;

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
      :width="primaryPhoto.width"
      :height="primaryPhoto.height"
    />

    <img
      class="absolute top-0 left-0 mt-3 ml-3 w-1/4 cursor-pointer rounded-xl border-2 border-black bg-zinc-800"
      :src="imageUrl(isSecondaryLarge)"
      :alt="alt(isSecondaryLarge)"
      loading="lazy"
      :width="primaryPhoto.width"
      :height="primaryPhoto.height"
      @click="isSecondaryLarge = !isSecondaryLarge"
    />

    <slot name="footer" />
  </div>
</template>
