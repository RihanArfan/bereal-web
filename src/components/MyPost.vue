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
      :realmojis="post.realMojis"
      :size="8"
      class="justify-center -mt-4 relative"
    />

    <div class="text-center">
      <p
        v-if="post.caption"
        class="px-3 text-md font-medium"
        :class="{ 'mt-1 ': !post.realMojis.length }"
      >
        {{ post.caption }}
      </p>
      <p
        v-if="post.lateInSeconds"
        class="text-xs font-normal text-center text-gray-500"
      >
        {{ humanLateTime }} late
      </p>
    </div>
  </div>
</template>
