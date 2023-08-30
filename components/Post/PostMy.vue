<script setup lang="ts">
import type { UserPosts } from "~/types/posts";

interface Props extends UserPosts {
  hideComments?: boolean;
}

const props = defineProps<Props>();

const selectedPost = ref(0);
const currentPost = computed(() => props.posts[selectedPost.value]);
</script>

<template>
  <div class="text-center">
    <div class="flex overflow-x-auto">
      <PostBody
        v-for="post in posts"
        :key="post.id"
        :primary="post.primary"
        :secondary="post.secondary"
        :username="user.username"
      >
        <template #footer>
          <RealMojis
            :realmojis="post.realMojis"
            :limit="6"
            class="absolute bottom-0 left-0 mb-3 ml-3"
          />
        </template>
      </PostBody>
    </div>

    <p v-if="currentPost.caption" class="text-md mt-1 px-3 font-medium sm:mt-2">
      {{ currentPost.caption }}
    </p>

    <NuxtLink
      v-if="!hideComments"
      class="text-md block px-3 text-gray-500 sm:mt-1"
      :class="{ 'mt-2 sm:mt-2': !currentPost.caption }"
      to="/"
    >
      <template v-if="currentPost.comments?.length == 1">
        View 1 comment
      </template>
      <template v-if="currentPost.comments">
        View all {{ currentPost.comments.length }} comments
      </template>
      <template v-else>Add a comment...</template>
    </NuxtLink>
  </div>
</template>
