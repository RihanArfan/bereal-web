<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

const showNav = ref(true);
const lastScrollTop = ref(0);

const { y } = useWindowScroll();

watch(y, (y) => {
  y > lastScrollTop.value && y > 350
    ? (showNav.value = false)
    : (showNav.value = true);

  lastScrollTop.value = y;
});
</script>

<template>
  <nav
    class="fixed top-0 right-1/2 left-1/2 z-20 mt-12 flex justify-center gap-5 pt-3 text-lg font-medium text-zinc-300 transition-opacity duration-300 sm:pt-0"
    :class="{
      'opacity-0': !showNav,
      'opacity-100': showNav,
    }"
  >
    <RouterLink
      :to="{ name: 'friends-feed' }"
      exact-active-class="text-white"
      class="transition-colors hover:text-white"
    >
      Friends
    </RouterLink>
    <RouterLink
      :to="{ name: 'discovery-feed' }"
      exact-active-class="text-white"
      class="transition-colors hover:text-white"
    >
      Discovery
    </RouterLink>
  </nav>

  <main class="mt-10">
    <RouterView />
  </main>
</template>
