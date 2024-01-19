<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const { isPending, isError, data, error } = useQuery({
  queryKey: ["feeds", "friends"],
  queryFn: () => useFetchFriendsFeed(),
});
</script>

<template>
  <div class="flex select-none flex-col text-zinc-100 md:flex-row">
    <aside
      id="sidebar"
      class="top-0 flex transition-transform md:sticky md:h-full md:w-1/3 md:min-w-[24rem] md:bg-neutral-900"
    >
      <div
        class="mx-auto flex w-full max-w-md flex-col pt-2 md:mx-0 md:ml-auto md:h-screen md:px-2"
      >
        <NavBar>
          <template #right>
            <Icon
              name="heroicons:ellipsis-vertical-20-solid"
              color="white"
              class="h-5 w-5"
            />
          </template>
        </NavBar>

        <p v-if="isError && !data">Error: {{ error }}</p>
        <template v-if="isPending"><!-- TODO: skeleton --></template>

        <MyPost
          v-if="data?.userPosts"
          v-bind="data.userPosts"
          class="mt-3 shrink py-3 md:basis-2/3"
          image-class="max-w-[16rem]"
        />

        <div
          class="fixed bottom-0 left-0 right-0 z-50 mx-auto my-1 mb-3 flex h-12 w-12 shrink-0 items-center justify-center md:relative md:my-auto md:mb-0 md:grow"
        >
          <button
            class="md:border-3 h-12 w-12 rounded-full border-4 border-white ring-2 ring-white transition-all hover:ring-4 active:h-10 active:w-10 active:ring-2 md:h-11 md:w-11"
          />
        </div>

        <div
          class="mb-1 mt-auto hidden shrink-0 items-center gap-4 rounded-lg px-7 py-2 transition-colors hover:bg-black/40 md:flex xl:py-5"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/RihanArfan.png"
              alt="@RihanArfan"
            />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>

          <p class="truncate text-lg font-semibold xl:text-xl">Rihan Arfan</p>

          <Icon name="heroicons:chevron-up" class="mx-1 ml-auto text-xl" />
        </div>
      </div>
    </aside>

    <main class="flex grow select-auto justify-center pt-5 md:px-3">
      <div class="max-w-full sm:max-w-sm md:max-w-sm xl:max-w-md">
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
