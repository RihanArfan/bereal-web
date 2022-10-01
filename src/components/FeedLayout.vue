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
    class="fixed bottom-0 right-1/2 left-1/2 z-20 mb-5 flex justify-center gap-3 text-lg font-semibold text-zinc-400 transition-opacity duration-300"
    :class="{ 'opacity-0': !showNav, 'opacity-100': showNav }"
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

  <RouterView />
</template>
