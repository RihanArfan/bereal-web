<script setup lang="ts"></script>

<template>
  <header
    class="mb-3 sticky top-0 z-50 py-2 bg-black/[97%] before:content-[''] before:absolute before:rounded-tl-lg before:shadow-black/[97%] before:shadow-[0_-25px_0_0] before:h-[50px] before:bottom-[-50px] before:w-3 after:content-[''] after:absolute after:rounded-tr-lg after:shadow-black/[97%] after:shadow-[0_-25px_0_0] after:h-[50px] after:bottom-[-50px] after:w-3 after:right-0"
  >
    <img
      alt="BeReal logo"
      src="@/assets/text.png"
      class="invert mx-auto"
      width="100"
    />
  </header>

  <RouterView />
</template>
