<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const { isPending, isError, data, error } = useQuery({
  queryKey: ["feeds", "friends"],
  queryFn: () => useFetchFriendsFeed(),
});
</script>

<template>
  <div>
    <NuxtLayout name="feed">
      <p v-if="isPending">Pending</p>
      <p v-if="isError">Error: {{ error }}</p>

      <Post
        v-for="friendPost in data?.friendsPosts"
        :key="friendPost.user.id"
        v-bind="friendPost"
        class="pb-5 md:pb-7 select-none"
      />
    </NuxtLayout>
  </div>
</template>
