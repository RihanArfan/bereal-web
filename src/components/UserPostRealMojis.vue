<script setup lang="ts">
import Popper from "vue3-popper";
import type { DiscoveryRealmoji } from "@/types/realmojis";

const props = defineProps<{
  realmojis: DiscoveryRealmoji[];
  size?: 8 | 12 | 16;
  limit: number;
  total?: number;
}>();

const realmojisInLimit = computed(() => props.realmojis.slice(0, props.limit));

const sizeClass = computed(() => {
  switch (props.size) {
    case 8:
      return "w-8 h-8";
    case 16:
      return "w-16 h-16";
    default:
      return "w-12 h-12";
  }
});
</script>

<template>
  <div class="flex w-[calc(100%_-_theme('gap.2'))]">
    <Popper
      v-for="(realmoji, index) in realmojisInLimit"
      :key="realmoji.id"
      :class="{ '!-ml-2': index !== 0 }"
      :hover="true"
      :z-index="10"
      placement="top"
      offset-distance="0"
    >
      <img
        :src="realmoji.uri ?? realmoji.media.url"
        :alt="`${realmoji.user.username} reacted ${realmoji.emoji}`"
        loading="lazy"
        class="rounded-full border-2 border-black"
        :class="sizeClass"
      />

      <template #content>
        <div class="max-w-xs text-center">
          <img
            :src="realmoji.uri ?? realmoji.media.url"
            :alt="`${realmoji.user.username} reacted ${realmoji.emoji}`"
            loading="lazy"
            class="rounded-lg"
          />

          <RouterLink
            :to="{
              name: 'profile',
              params: { username: realmoji.user.username },
            }"
            class="absolute bottom-0 left-0 mb-2 ml-2 rounded-full bg-zinc-100 px-1 text-center text-sm font-thin text-black"
          >
            {{ realmoji.emoji }}
            @<span class="font-medium">{{ realmoji.user.username }}</span>
          </RouterLink>
        </div>
      </template>
    </Popper>

    <div
      v-if="total && total > limit"
      class="-ml-2 flex items-center justify-center rounded-full border border-black bg-zinc-300 text-center font-bold text-black"
      :class="sizeClass"
    >
      +{{ total - realmojisInLimit.length }}
    </div>
  </div>
</template>
