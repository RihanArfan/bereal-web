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
  <div class="relative top-0 left-0">
    <Transition mode="out-in">
      <img
        ref="primaryEl"
        :key="imageSrc"
        :src="imageSrc"
        class="rounded-xl bg-zinc-900 h-full"
        :alt="alt(!isSecondaryLarge)"
        loading="lazy"
        :width="primary.width"
        :height="primary.height"
        draggable="false"
      />
    </Transition>

    <div
      ref="secondaryEl"
      class="absolute top-0 left-0 mx-3 mt-3 w-1/3"
      draggable
      @click="isSecondaryLarge = !isSecondaryLarge"
      @dragend.prevent="onDragEnd"
    >
      <Transition mode="out-in">
        <img
          :key="imageSrcSmall"
          class="w-full rounded-xl border-2 border-black bg-zinc-800"
          :src="imageSrcSmall"
          :alt="alt(isSecondaryLarge)"
          loading="lazy"
          :width="secondary.width"
          :height="secondary.height"
          draggable="false"
        />
      </Transition>
    </div>

    <slot name="footer" />
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.075s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.5;
}
</style>
