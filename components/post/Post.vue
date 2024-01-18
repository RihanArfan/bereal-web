<!-- eslint-disable vue/multi-word-component-names -->
<!-- TODO: rename file -->
<script setup lang="ts">
import type { CarouselApi } from "@/components/ui/carousel";
import type { UserPosts } from "~/types/posts";

interface Props extends UserPosts {
  hideComments?: boolean;
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
</script>

<template>
  <div>
    <PostHeader :post="currentPost" :user="user" />

    <div class="flex overflow-x-auto">
      <Carousel
        class="relative w-full"
        :opts="{ align: 'center', containScroll: false }"
        @init-api="setApi"
      >
        <CarouselContent class="rounded-xl">
          <CarouselItem v-for="post in posts" :key="post.id">
            <PostBody
              :primary="post.primary"
              :secondary="post.secondary"
              :username="user.username"
            >
              <template #footer>
                <RealMojis
                  :real-mojis="post.realMojis"
                  class="absolute bottom-0 left-0 mb-3 ml-3"
                />
              </template>
            </PostBody>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>

    <div v-if="posts.length > 1" class="flex justify-center text-xl -mb-2">
      <span v-for="i in totalCount" :key="i">
        <span
          class="cursor-pointer"
          :class="{ 'text-gray-300/50': i !== current }"
          @click="api?.scrollTo(i - 1)"
        >
          •
        </span>
      </span>
    </div>

    <PostFooter v-bind="currentPost" :hide-comments="hideComments" />
  </div>
</template>
