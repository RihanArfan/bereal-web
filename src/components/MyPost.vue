<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Post } from "@/types/types";
const props = defineProps<{ post: Post; small?: boolean }>();

dayjs.extend(duration);
dayjs.extend(relativeTime);

const humanLateTime = computed(() =>
  dayjs.duration(props.post.lateInSeconds, "s").humanize()
);
</script>

<template>
  <div>
    <PostPhotos
      class="mx-auto"
      :class="{ 'w-2/5': small }"
      :primary-photo="{
        url: post.photoURL,
        height: post.imageHeight,
        width: post.imageWidth,
      }"
      :secondary-photo="{
        url: post.secondaryPhotoURL,
        height: post.secondaryImageHeight,
        width: post.secondaryImageWidth,
      }"
      :username="post.userName"
    />

    <UserPostRealMojis
      v-if="post.realMojis.length"
      :realmojis="post.realMojis"
      :size="8"
      class="relative -mt-4 justify-center"
    />

    <div class="text-center">
      <p
        v-if="post.caption"
        class="text-md px-3 font-medium"
        :class="{ 'mt-1 ': !post.realMojis.length }"
      >
        {{ post.caption }}
      </p>
      <p
        v-if="post.lateInSeconds"
        class="text-center text-xs font-normal text-gray-500"
      >
        {{ humanLateTime }} late
      </p>
    </div>
  </div>
</template>
