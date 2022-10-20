<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <NavBar
    v-if="authStore.isLoggedIn"
    class="pt-3 before:absolute before:top-0 before:left-0 before:h-[50px] before:w-3 before:rounded-tl-lg before:shadow-[0_-25px_0_0] before:shadow-black/[97%] before:content-[''] after:absolute after:top-0 after:right-0 after:h-[50px] after:w-3 after:rounded-tr-lg after:shadow-[0_-25px_0_0] after:shadow-black/[97%] after:content-[''] sm:pt-0"
  />

  <div
    class="mx-auto flex max-w-lg flex-col px-2 pb-2 pt-3 sm:px-0 sm:pt-0"
    :class="{
      'mt-12': $route.name !== 'profile' && $route.name !== 'my-profile',
      'pt-0': $route.name === 'profile' || $route.name === 'my-profile',
    }"
  >
    <RouterView />
  </div>
</template>
