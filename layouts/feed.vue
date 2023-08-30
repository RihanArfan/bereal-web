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
      id="sidebar"
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

<style>
/* dual screen support */
@media (horizontal-viewport-segments: 2) {
  #sidebar {
    width: env(viewport-segment-width 0 0);

    /* this will prevent content from being rendered behind the device mask */
    /* whoever made dual screen web support should be ashamed with themselves for allowing this to even be an option */
    margin-inline-end: calc(
      env(viewport-segment-left 1 0) - env(viewport-segment-right 0 0)
    );
  }
}
</style>
