<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Post } from "@/types/posts";
import { useLocationQuery } from "@/composables/locationApi";

const props = defineProps<{
  post: Post;
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
        url: post.primary.url,
        width: post.primary.width,
        height: post.primary.height,
      }"
      :secondary-photo="{
        url: post.secondary.url,
        width: post.secondary.width,
        height: post.secondary.height,
      }"
      :username="post.user.username"
      @click="$router.push({ name: 'my-post' })"
    />

    <UserPostRealMojis
      v-if="post.realmojis.sample.length && !hideRealmojis"
      :realmojis="post.realmojis.sample"
      :size="8"
      class="relative -mt-4 justify-center"
      :limit="2"
      :total="post.realmojis.total"
    />

    <div v-if="!hideDetails" class="text-center">
      <RouterLink
        :to="{ name: 'caption' }"
        class="text-md block cursor-pointer px-3 font-medium"
        :class="{ 'mt-1': !post.realmojis.sample.length }"
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
          {{ dayjs(post.takenAt).fromNow() }}
        </template>
      </p>
    </div>
  </div>
</template>
