<script setup lang="ts">
defineProps<{ small?: boolean }>();
</script>

<template>
  <div>
    <div class="relative animate-pulse">
      <img
        :class="{ 'w-2/5': small }"
        class="rounded-xl bg-slate-200 mx-auto"
        :width="1500"
        :height="2000"
        alt=""
      />
    </div>

    <div class="flex justify-center mt-2">
      <div class="h-3 rounded bg-slate-200 w-32 animate-pulse" />
    </div>
  </div>
</template>
