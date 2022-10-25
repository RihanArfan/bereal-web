<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { isLoading, isError, data, error } = useFriendsFeedQuery();

const {
  isLoading: isMeLoading,
  isError: isMeError,
  data: me,
  error: meError,
} = usePostQuery("me");

const othersPosts = computed(() =>
  data.value?.filter(({ user }) => user.id !== authStore.userId)
);
</script>

<template>
  <template v-if="isMeLoading">
    <SkeletonMyPost :small="true" class="mb-5" />
  </template>

  <span v-else-if="isError || isMeError">Error: {{ error }} {{ meError }}</span>

  <MyPost
    v-if="me"
    :post="me"
    :small="true"
    class="mb-5"
    @click="$router.push({ name: 'post', params: { id: 'me' } })"
  />

  <template v-if="isLoading">
    <SkeletonUserPost v-for="x in 3" :key="x" class="mb-5" />
  </template>

  <template v-if="data">
    <UserPost
      v-for="post in othersPosts"
      :key="post.id"
      :post="post"
      class="mb-5"
    />
  </template>
</template>
