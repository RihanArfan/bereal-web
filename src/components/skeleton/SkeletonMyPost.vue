<script setup lang="ts">
defineProps<{
  small?: boolean;
  hideDetails?: boolean;
}>();
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

    <div v-if="!hideDetails" class="mt-2.5 flex flex-col items-center">
      <div class="h-4 w-32 animate-pulse rounded bg-slate-200" />
      <div class="mt-2 h-2.5 w-40 animate-pulse rounded bg-slate-200" />
    </div>
  </div>
</template>
