<script setup lang="ts">
const showNav = ref(true);
const lastScrollTop = ref(0);

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  scrollTop > lastScrollTop.value && scrollTop > 350
    ? (showNav.value = false)
    : (showNav.value = true);

  lastScrollTop.value = scrollTop;
});
</script>

<template>
  <nav
    class="fixed top-0 right-1/2 left-1/2 z-20 pt-11 flex justify-center gap-3 font-semibold text-md transition-opacity duration-300 text-gray-400"
    :class="{ 'opacity-0': !showNav, 'opacity-100': showNav }"
  >
    <RouterLink :to="{ name: 'friends-feed' }" exact-active-class="text-white">
      Friends
    </RouterLink>
    <RouterLink
      :to="{ name: 'discovery-feed' }"
      exact-active-class="text-white"
    >
      Discovery
    </RouterLink>
  </nav>

  <main class="mt-20">
    <RouterView />
  </main>
</template>
