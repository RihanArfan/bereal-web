<script setup lang="ts">
import { useDrag } from "@vueuse/gesture";
import {
  useMotionProperties,
  useSpring,
  type PermissiveMotionProperties,
} from "@vueuse/motion";
import { useElementBounding } from "@vueuse/core";

import type { Picture } from "@/types/types";

const props = defineProps<{
  primary: Picture;
  secondary: Picture;
  username: string;
}>();

const isSecondaryLarge = ref(false);

const imageUrl = (primary: boolean) =>
  primary ? props.primary.url : props.secondary.url;

const alt = (primary: boolean) =>
  primary
    ? `${props.username}'s photo'`
    : `${props.username}'s secondary photo`;

const primaryEl = ref<HTMLImageElement | null>(null);
const secondaryEl = ref<HTMLImageElement | null>(null);

const { width: primaryWidth, height: primaryHeight } =
  useElementBounding(primaryEl);
const { width: secondaryWidth } = useElementBounding(secondaryEl);

// Bind to the element or component reference and init style properties that will be animated.
const { motionProperties } = useMotionProperties(secondaryEl, {
  cursor: "grab",
});

// Bind the motion properties to a spring reactive object.
const { set } = useSpring(
  motionProperties as Partial<PermissiveMotionProperties>
);

// Handle dragging of the secondary picture
const dragHandler = ({
  movement: [x, y],
  dragging,
  tap,
}: {
  movement: [number, number];
  dragging: boolean;
  tap: boolean;
}) => {
  const marginInPx = 24; // mr-3 = 0.75 rem, with 16px = 1 rem and doubled to compensate for ml-3. needed because margin right not having an effect

  const rightX = primaryWidth.value - secondaryWidth.value - marginInPx;
  const leftX = 0;

  if (tap) return (isSecondaryLarge.value = !isSecondaryLarge.value);
  if (dragging)
    return set({
      x: Math.max(Math.min(x, rightX), leftX),
      y: Math.max(Math.min(y, primaryHeight.value), 0), // TODO: fix dragging below primary image
      cursor: "grabbing",
    });

  // determine whether to set on right or left of the primary image
  const isRight = x + secondaryWidth.value / 2 > primaryWidth.value / 2;
  const isLeft = !isRight;

  const setHelper = (x: number) => {
    dragModule.config.drag!.initial = [rightX, 0];

    set({ x, y: 0, cursor: "grab" });
  };

  if (isRight) return setHelper(rightX);
  if (isLeft) return setHelper(leftX);
};

const dragModule = useDrag(dragHandler, {
  domTarget: secondaryEl,
  filterTaps: true,
  preventWindowScrollY: true,
});
</script>

<template>
  <div class="relative">
    <img
      ref="primaryEl"
      :src="imageUrl(!isSecondaryLarge)"
      class="rounded-xl bg-zinc-900"
      :alt="alt(!isSecondaryLarge)"
      loading="lazy"
      :width="primary.width"
      :height="primary.height"
    />

    <div ref="secondaryEl" class="absolute top-0 left-0 mx-3 mt-3 w-1/3">
      <img
        class="w-full rounded-xl border-2 border-black bg-zinc-800"
        :src="imageUrl(isSecondaryLarge)"
        :alt="alt(isSecondaryLarge)"
        loading="lazy"
        :width="secondary.width"
        :height="secondary.height"
        draggable="false"
      />
    </div>

    <slot name="footer" />
  </div>
</template>
