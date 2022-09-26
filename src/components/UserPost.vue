<script setup lang="ts">
import type { Post } from "@/types/types";

defineProps<{ post: Post }>();
</script>

<template>
  <div>
    <UserPostHeader :post="post" />

    <PostPhotos
      :primary-photo="{
        url: post.photoURL,
        height: post.imageHeight,
        width: post.imageWidth,
      }"
      :secondary-photo="{
        url: post.secondaryPhotoURL,
        height: post.secondaryImageHeight,
        width: post.secondaryImageWidth,
      }"
      :username="post.userName"
    >
      <template #footer>
        <UserPostRealMojis
          :realmojis="post.realMojis"
          class="absolute bottom-0 left-0 ml-3 mb-3"
        />
      </template>
    </PostPhotos>

    <p v-if="post.caption" class="px-3 mt-1 text-md font-medium">
      {{ post.caption }}
    </p>
  </div>
</template>
