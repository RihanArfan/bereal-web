<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const { isPending, isError, data, error } = useQuery({
  queryKey: ["feeds", "friends"],
  queryFn: () => useFetchFriendsFeed(),
});
</script>

<template>
  <div class="flex text-zinc-100 flex-col md:flex-row">
    <aside
      class="flex h-screen bg-neutral-900 md:w-1/3 md:min-w-[24rem] md:sticky top-0"
    >
      <div
        class="py-2 px-2 md:pl-0 xl:max-w-2xl mx-auto md:mx-0 md:ml-auto flex flex-col w-full"
      >
        <NavBar />

        <p v-if="isPending">Pending</p>
        <p v-if="isError">Error: {{ error }}</p>

        <PostMy
          v-if="data"
          :key="data.userPosts.user.id"
          v-bind="data.userPosts"
          class="max-w-xs py-5 mx-auto"
        />
      </div>
    </aside>

    <main class="lg:px-3 pt-5 grow flex justify-center">
      <div class="max-w-md xl:max-w-lg">
        <slot />
      </div>
    </main>
  </div>
</template>
