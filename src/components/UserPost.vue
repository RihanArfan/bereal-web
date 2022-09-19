<script setup lang="ts">
import type { Post } from "@/types/types";
const props = defineProps<{ post: Post }>();

const isSecondaryLarge = ref(false);

const imageUrl = (primary: boolean) =>
  primary ? props.post.photoURL : props.post.secondaryPhotoURL;

const alt = (primary: boolean) =>
  primary
    ? `${props.post.userName}'s photo'`
    : `${props.post.userName}'s secondary photo`;
</script>

<template>
  <div>
    <UserPostHeader :post="post" />

    <div class="relative">
      <img
        :src="imageUrl(!isSecondaryLarge)"
        class="rounded-xl"
        :alt="alt(!isSecondaryLarge)"
        loading="lazy"
        :width="post.imageWidth"
        :height="post.imageHeight"
      />

      <img
        class="rounded-xl mt-3 ml-3 absolute top-0 left-0 w-1/4 border-2 border-black cursor-pointer"
        :src="imageUrl(isSecondaryLarge)"
        :alt="alt(isSecondaryLarge)"
        loading="lazy"
        :width="post.imageWidth"
        :height="post.imageHeight"
        @click="isSecondaryLarge = !isSecondaryLarge"
      />
    </div>

    <p v-if="post.caption" class="px-3 mt-1 text-md font-medium">
      {{ post.caption }}
    </p>
  </div>
</template>
