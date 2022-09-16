<script setup lang="ts">
import type { Post } from "@/types/types";
defineProps<{ post: Post }>();
</script>

<template>
  <div>
    <img
      :src="post.photoURL"
      class="rounded-xl max-w-full"
      :alt="`${post.userName}'s Photo`"
      loading="lazy"
      :width="post.imageWidth"
      :height="post.imageHeight"
    />
    <img
      :src="post.secondaryPhotoURL"
      :alt="`${post.userName}'s Secondary Photo`"
      loading="lazy"
      :width="post.imageWidth"
      :height="post.imageHeight"
    />
  </div>
</template>
