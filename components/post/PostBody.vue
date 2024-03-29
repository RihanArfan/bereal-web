<script setup lang="ts">
import type { Media } from "@/types/types";

const props = defineProps<{
  primary: Media;
  secondary: Media;
  username: string;
}>();

const isSecondaryLarge = ref(false);

const imageSrc = computed(() => {
  return isSecondaryLarge.value ? props.secondary.url : props.primary.url;
});
const imageSrcSmall = computed(() => {
  return isSecondaryLarge.value ? props.primary.url : props.secondary.url;
});

const alt = (primary: boolean) =>
  primary
    ? `${props.username}'s photo'`
    : `${props.username}'s secondary photo`;

const primaryEl = ref<HTMLImageElement | null>(null);
const secondaryEl = ref<HTMLImageElement | null>(null);

const primaryBox = useElementBounding(primaryEl);
const secondaryBox = useElementBounding(secondaryEl);

const { set } = useSpring(secondaryEl, {
  damping: 50,
  stiffness: 220,
  cursor: "grab",
});

// dragging of the secondary picture
useDraggable(secondaryEl, {
  onMove(position) {
    console.log("Dragging", position);
    // (position, event)
    if (secondaryBox.top.value < primaryBox.top.value) {
      set({ y: primaryBox.top.value });
    }

    // if secondaryBox.bottom is greater than primaryBox.bottom then set() to primaryBox.bottom
    if (secondaryBox.bottom.value > primaryBox.bottom.value) {
      set({ y: primaryBox.bottom.value - secondaryBox.height.value });
    }

    // if secondaryBox.left is less than primaryBox.left then set() to primaryBox.left
    if (secondaryBox.left.value < primaryBox.left.value) {
      set({ x: primaryBox.left.value });
    }

    // if secondaryBox.right is greater than primaryBox.right then set() to primaryBox.right
    if (secondaryBox.right.value > primaryBox.right.value) {
      set({ x: primaryBox.right.value - secondaryBox.width.value });
    }

    set({ x: position.x, y: position.y });
  },

  onEnd: () => {
    // figure what corner of the primaryBox is closest to the secondaryBox
    const y =
      Math.abs(primaryBox.top.value - secondaryBox.top.value) <
      Math.abs(primaryBox.bottom.value - secondaryBox.bottom.value)
        ? primaryBox.top.value
        : primaryBox.bottom.value - secondaryBox.height.value;

    const x =
      Math.abs(primaryBox.left.value - secondaryBox.left.value) <
      Math.abs(primaryBox.right.value - secondaryBox.right.value)
        ? primaryBox.left.value
        : primaryBox.right.value - secondaryBox.width.value;

    set({ y, x });
  },
});
</script>

<template>
  <div class="relative w-screen max-w-full">
    <AspectRatio :ratio="3 / 4" class="relative rounded-xl bg-zinc-900">
      <Transition>
        <img
          ref="primaryEl"
          :key="imageSrc"
          :src="imageSrc"
          class="absolute h-full w-full rounded-xl"
          :alt="alt(!isSecondaryLarge)"
          loading="lazy"
          :width="primary.width"
          :height="primary.height"
          draggable="false"
        />
      </Transition>

      <div
        ref="secondaryEl"
        class="absolute left-0 top-0 mx-3 mt-3 w-1/3 rounded-xl bg-zinc-800"
        draggable
        @click="isSecondaryLarge = !isSecondaryLarge"
      >
        <img
          class="rounded-xl border-2 border-black"
          :src="imageSrcSmall"
          :alt="alt(isSecondaryLarge)"
          loading="lazy"
          :width="secondary.width"
          :height="secondary.height"
          draggable="false"
        />
      </div>
    </AspectRatio>

    <slot name="footer" />
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
