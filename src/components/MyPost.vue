<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import type { DiscoveryPost } from "@/types/posts";

const props = defineProps<{
  post: DiscoveryPost;
  small?: boolean;
  hideRealmojis?: boolean;
  hideDetails?: boolean;
}>();

dayjs.extend(duration);
dayjs.extend(relativeTime);

const { isLoading: isLocationLoading, data } = useLocationQuery(
  props.post.location?._latitude || 0,
  props.post.location?._longitude || 0,
  { enabled: !!props.post.location }
);

const location = computed(
  () => data.value?.resourceSets[0].resources[0]?.address.countryRegion
);

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
      v-if="post.realMojis.length && !hideRealmojis"
      :realmojis="post.realMojis"
      :size="8"
      class="relative -mt-4 justify-center"
    />

    <div v-if="!hideDetails" class="text-center">
      <RouterLink
        :to="{ name: 'caption' }"
        class="text-md block cursor-pointer px-3 font-medium"
        :class="{ 'mt-1': !post.realMojis.length }"
      >
        {{ post.caption }}
        <template v-if="!post.caption">Add a caption...</template>
      </RouterLink>
      <p class="text-center text-xs font-normal text-gray-500">
        <template v-if="post.location && !isLocationLoading">
          {{ location }} •
        </template>

        <template v-if="post.lateInSeconds">{{ humanLateTime }} late</template>
        <template v-else>
          {{ dayjs(post.takenAt._seconds * 1000).fromNow() }}
        </template>
      </p>
    </div>
  </div>
</template>
