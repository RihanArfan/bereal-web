<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { isLoading, isError, data, error } = useFriendsFeedQuery();

const myPost = computed(() =>
  data.value?.find(({ user }) => user.id === authStore.userId)
);
const othersPosts = computed(() =>
  data.value?.filter(({ user }) => user.id !== authStore.userId)
);
</script>

<template>
  <template v-if="isLoading">
    <SkeletonMyPost :small="true" class="mb-9" />
    <SkeletonUserPost v-for="x in 3" :key="x" class="mb-5" />
  </template>

  <span v-else-if="isError">Error: {{ error }}</span>

  <template v-if="data">
    <MyPost v-if="myPost" :post="myPost" :small="true" class="mb-5" />

    <UserPost
      v-for="post in othersPosts"
      :key="post.id"
      :post="post"
      class="mb-5"
    />
  </template>
</template>
