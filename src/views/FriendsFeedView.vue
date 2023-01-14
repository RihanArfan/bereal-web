<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { HTTPError } from "ky";

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

  <template v-else-if="isMeError">
    <CreatePost
      v-if="meError instanceof HTTPError && meError.response.status === 404"
      :small="true"
      class="mb-5"
    />

    <span v-else>Error: {{ meError }}</span>
  </template>

  <MyPost
    v-if="me"
    :post="me"
    :small="true"
    class="mb-5"
    @click.stop
    @open="$router.push({ name: 'post', params: { id: 'me' } })"
  />

  <template v-if="isLoading">
    <SkeletonUserPost v-for="x in 3" :key="x" class="mb-5" />
  </template>

  <span v-else-if="isError">Error: {{ error }}</span>

  <template v-if="data">
    <UserPost
      v-for="post in othersPosts"
      :key="post.id"
      :post="post"
      class="mb-5"
    />
  </template>
</template>
