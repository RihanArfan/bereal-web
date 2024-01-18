<script setup lang="ts">
import type { Post } from "~/types/posts";
interface Props extends Post {
  hideComments?: boolean;
}
defineProps<Props>();
</script>

<template>
  <p v-if="caption" class="text-md mt-1 px-4 font-medium sm:mt-2">
    {{ caption }}
  </p>

  <NuxtLink
    v-if="!hideComments"
    class="text-sm block px-4 text-gray-400 mt-2"
    :class="{ 'mt-0.5': caption }"
    to="/"
  >
    <template v-if="comments.length == 1">View comment</template>
    <template v-else-if="comments.length">
      View all {{ comments.length }} comments
    </template>
    <template v-else>Add a comment...</template>
  </NuxtLink>
</template>
