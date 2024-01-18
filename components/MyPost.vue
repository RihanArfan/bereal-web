<script setup lang="ts">
import type { CarouselApi } from "@/components/ui/carousel";
import type { UserPosts } from "~/types/posts";

interface Props extends UserPosts {
  hideComments?: boolean;
  imageClass?: string;
}

const props = defineProps<Props>();

const sortedPosts = computed(() =>
  props.posts.toSorted((a, b) => {
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  })
);

const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(1);

function setApi(val: CarouselApi) {
  api.value = val;
}

watchOnce(api, (api) => {
  if (!api) return;

  totalCount.value = api.scrollSnapList().length;
  current.value = api.selectedScrollSnap() + 1;

  api.on("select", () => {
    current.value = api.selectedScrollSnap() + 1;
  });
});

const currentPost = computed(() => sortedPosts.value[current.value - 1]);

const timeAgo = useTimeAgo(currentPost.value.postedAt);
const lateDuration = useLateDuration(
  new Date(currentPost.value.takenAt),
  currentPost.value.lateInSeconds
);
</script>

<template>
  <div class="flex flex-col items-center">
    <Carousel
      class="relative w-full max-w-xs"
      :opts="{ align: 'center', containScroll: false }"
      @init-api="setApi"
    >
      <CarouselContent class="rounded-xl">
        <CarouselItem v-for="post in posts" :key="post.id" class="basis-2/3">
          <PostBody
            :primary="post.primary"
            :secondary="post.secondary"
            :username="user.username"
            :class="[imageClass, { 'w-1/2': post.id !== currentPost.id }]"
          >
          </PostBody>
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <RealMojis
      v-if="currentPost.realMojis.length"
      :real-mojis="currentPost.realMojis"
      class="-mt-4 justify-center z-10"
      size="xs"
    />

    <p
      v-if="currentPost?.caption"
      class="text-md mt-3 md:mt-4 px-3 font-medium sm:mt-2 text-center text-balance select-text"
    >
      {{ currentPost.caption }}
    </p>

    <p v-else class="text-md mt-3 md:mt-4 px-3 font-medium sm:mt-2 text-center">
      Add a caption...
    </p>

    <p class="mt-1 text-xs text-[#a1a1a1]">
      <span v-if="currentPost.isLate" class="inline-flex">
        {{ lateDuration?.number }}{{ lateDuration?.unit.slice(0, 1) }}
        late
      </span>
      <span v-else>{{ timeAgo }}</span>
      <span v-if="currentPost.location"> • United Kingdom</span>
    </p>

    <!-- TODO: replace with comment icon as realmoji to match app -->
    <NuxtLink
      v-if="!hideComments"
      class="text-md block px-3 text-gray-500 sm:mt-1"
      :class="{ 'mt-2 sm:mt-2': !currentPost.caption }"
      to="/"
    >
      <template v-if="currentPost.comments.length == 1">
        View comment
      </template>
      <template v-else-if="currentPost.comments.length">
        View all {{ currentPost.comments.length }} comments
      </template>
    </NuxtLink>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
