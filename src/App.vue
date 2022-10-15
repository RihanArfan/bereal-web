<script setup lang="ts">
import { useIsNavSpacing } from "@/composables/useIsNavSpacing";
</script>

<template>
  <NavBar :class="{ 'pt-5': useIsNavSpacing }" />

  <div
    class="mx-auto flex max-w-lg flex-col px-2 pb-2 sm:px-0"
    :class="{ 'mt-12': $route.name !== 'profile', 'pt-5': useIsNavSpacing }"
  >
    <RouterView />
  </div>
</template>
