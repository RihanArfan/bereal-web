<script setup lang="ts">
defineProps<{
  small?: boolean;
  hideDetails?: boolean;
}>();
</script>

<template>
  <div :class="{ 'pb-10': !hideDetails }">
    <div
      class="mx-auto flex aspect-[0.75/1] flex-col items-center justify-center gap-5 rounded-xl bg-zinc-900 p-4 text-center"
      :class="{ 'w-2/5': small }"
    >
      <p class="text-lg font-medium">You haven't posted a BeReal today</p>

      <a
        href="bereal://camera"
        class="mb-3 block w-full rounded bg-white py-1 font-semibold text-black transition-colors hover:bg-gray-400"
      >
        Take BeReal via app
      </a>
    </div>
  </div>
</template>
