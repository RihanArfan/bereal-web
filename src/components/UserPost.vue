<script setup lang="ts">
import type { Post } from "@/types/posts";
defineProps<{ post: Post }>();
</script>

<template>
  <div>
    <UserPostHeader :post="post" />

    <PostPhotos
      :primary="post.primary"
      :secondary="post.secondary"
      :username="post.user.username"
    >
      <template #footer>
        <RealMojis
          :realmojis="post.realmojis.sample"
          :limit="6"
          :total="post.realmojis.total"
          class="absolute bottom-0 left-0 ml-3 mb-3"
        />
      </template>
    </PostPhotos>

    <p v-if="post.caption" class="text-md mt-1 px-3 font-medium">
      {{ post.caption }}
    </p>
  </div>
</template>
