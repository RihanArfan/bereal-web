<script setup lang="ts">
import type { DiscoveryPost } from "@/types/posts";

defineProps<{ post: DiscoveryPost }>();
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
          :limit="6"
          :total="post.realMojis.length"
          class="absolute bottom-0 left-0 ml-3 mb-3"
        />
      </template>
    </PostPhotos>

    <p v-if="post.caption" class="text-md mt-1 px-3 font-medium">
      {{ post.caption }}
    </p>
  </div>
</template>
