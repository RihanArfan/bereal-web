<script setup lang="ts">
import type { Post } from "@/types/types";
defineProps<{ post: Post }>();
</script>

<template>
  <div>
    <UserPostHeader :post="post" />

    <img
      :src="post.photoURL"
      class="rounded-xl"
      :alt="`${post.userName}'s photo`"
      loading="lazy"
      :width="post.imageWidth"
      :height="post.imageHeight"
    />

    <img
      class="rounded-xl mt-1"
      :src="post.secondaryPhotoURL"
      :alt="`${post.userName}'s secondary photo`"
      loading="lazy"
      :width="post.imageWidth"
      :height="post.imageHeight"
    />

    <p v-if="post.caption" class="px-3 mt-1 text-md font-medium">
      {{ post.caption }}
    </p>
  </div>
</template>
