<script setup lang="ts">
const props = defineProps<{
  size?: 8 | 10 | 16 | 20 | 24 | 32;
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case 8:
      return "w-8 h-8";
    case 16:
      return "w-16 h-16";
    case 20:
      return "w-20 h-20";
    case 24:
      return "w-24 h-24";
    case 32:
      return "w-32 h-32";
    default:
      return "w-10 h-10";
  }
});
</script>

<template>
  <div
    class="rounded-full bg-slate-200 text-black font-bold items-center justify-center flex animate-pulse"
    :class="sizeClass"
  />
</template>
