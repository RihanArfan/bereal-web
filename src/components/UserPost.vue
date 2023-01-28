<script setup lang="ts">
import type { Post } from "@/types/posts";

defineProps<{ post: Post; hideComments?: boolean }>();
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

    <p v-if="post.caption" class="text-md mt-1 px-3 font-medium sm:mt-2">
      {{ post.caption }}
    </p>

    <RouterLink
      v-if="!hideComments"
      class="text-md block px-3 text-gray-500 sm:mt-1"
      :class="{ 'mt-2 sm:mt-2': !post.caption }"
      :to="{ name: 'post', params: { id: post.id } }"
    >
      <template v-if="post.comments.total">
        View all {{ post.comments.total }} comments
      </template>
      <template v-else>Add a comment...</template>
    </RouterLink>
  </div>
</template>
