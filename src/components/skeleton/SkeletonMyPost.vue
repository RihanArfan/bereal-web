<script setup lang="ts">
defineProps<{ small?: boolean }>();
</script>

<template>
  <div>
    <div class="relative animate-pulse">
      <img
        :class="{ 'w-2/5': small }"
        class="mx-auto rounded-xl bg-slate-200"
        :width="1500"
        :height="2000"
        alt=""
      />
    </div>

    <div class="mt-2 flex justify-center">
      <div class="h-3 w-32 animate-pulse rounded bg-slate-200" />
    </div>
  </div>
</template>
