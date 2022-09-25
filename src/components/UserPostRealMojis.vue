<script setup lang="ts">
import Popper from "vue3-popper";
import type { RealMoji } from "@/types/types";

const props = defineProps<{ realmojis: RealMoji[] }>();
const hasManyRealmojis = computed(() => props.realmojis.length > 4);
const firstSixRealmojis = computed(() => props.realmojis.slice(0, 6));
</script>

<template>
  <div
    class="absolute bottom-0 left-0 ml-3 mb-3 flex w-full"
    :class="{ 'gap-1': !hasManyRealmojis }"
  >
    <div
      v-for="(realmoji, index) in firstSixRealmojis"
      :key="realmoji.id"
      :class="{ '-ml-2': hasManyRealmojis && index !== 0 }"
    >
      <Popper placement="top" :hover="true" :z-index="10">
        <img
          :src="realmoji.uri"
          :alt="`${realmoji.userName} reacted ${realmoji.emoji}`"
          loading="lazy"
          class="w-12 h-12 rounded-full border border-black"
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
              class="absolute bottom-0 left-0 mb-2 ml-2 text-sm text-center font-thin bg-zinc-100 rounded-full px-1 pb-[2px] text-black"
            >
              <span class="-mr-1">{{ realmoji.emoji }}</span>
              @<span class="font-medium">{{ realmoji.userName }}</span>
            </div>
          </div>
        </template>
      </Popper>
    </div>

    <div
      v-if="realmojis.length > 6"
      class="-ml-2 w-12 h-12 rounded-full border border-black text-black bg-zinc-300 text-center font-bold flex items-center justify-center"
    >
      +{{ props.realmojis.length - 6 }}
    </div>
  </div>
</template>
