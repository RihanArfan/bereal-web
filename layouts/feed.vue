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
      class="flex md:h-screen md:bg-neutral-900 md:w-1/3 md:min-w-[24rem] md:sticky top-0"
    >
      <div
        class="p-2 xl:max-w-2xl mx-auto md:mx-0 md:ml-auto flex flex-col w-full"
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

    <main class="md:px-3 pt-5 grow flex justify-center">
      <div class="sm:max-w-md xl:max-w-lg">
        <slot />
      </div>
    </main>
  </div>
</template>
