<script setup lang="ts">
import Popper from "vue3-popper";
import type { RealMoji } from "@/types/types";

const props = defineProps<{
  realmojis: RealMoji[];
  size?: 8 | 12;
}>();

const firstSixRealmojis = computed(() => props.realmojis.slice(0, 6));

const sizeClass = computed(() => {
  switch (props.size) {
    case 8:
      return "w-8 h-8";
    default:
      return "w-12 h-12";
  }
});
</script>

<template>
  <div class="flex w-full">
    <Popper
      v-for="(realmoji, index) in firstSixRealmojis"
      :key="realmoji.id"
      :class="{ '!-ml-2': index !== 0 }"
      :hover="true"
      :z-index="10"
      placement="top"
      offset-distance="0"
    >
      <img
        :src="realmoji.uri"
        :alt="`${realmoji.userName} reacted ${realmoji.emoji}`"
        loading="lazy"
        class="rounded-full border-2 border-black"
        :class="sizeClass"
      />

      <template #content>
        <div class="text-center max-w-xs">
          <img
            :src="realmoji.uri"
            :alt="`${realmoji.userName} reacted ${realmoji.emoji}`"
            loading="lazy"
            class="rounded-lg"
          />

          <div
            class="absolute bottom-0 left-0 mb-2 ml-2 text-sm text-center font-thin bg-zinc-100 rounded-full px-1 text-black"
          >
            {{ realmoji.emoji }}
            @<span class="font-medium">{{ realmoji.userName }}</span>
          </div>
        </div>
      </template>
    </Popper>

    <div
      v-if="realmojis.length > 6"
      class="-ml-2 w-12 h-12 rounded-full border border-black text-black bg-zinc-300 text-center font-bold flex items-center justify-center"
    >
      +{{ props.realmojis.length - 6 }}
    </div>
  </div>
</template>
