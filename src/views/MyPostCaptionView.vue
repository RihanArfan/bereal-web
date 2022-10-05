<script setup lang="ts">
import { useApiFunction } from "@/composables/useApi";
import { useFriendsFeedQuery } from "@/composables/queries";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { isLoading, isError, data, error } = useFriendsFeedQuery();

const myPost = computed(() =>
  data.value?.find(({ user }) => user.id === authStore.userId)
);

const caption = ref<string>();
watch(myPost, (newVal) => (caption.value = newVal?.caption));
watch(caption, async (newVal) => {
  // TODO: change to vue-query mutation
  await useApiFunction()
    .post("setCaptionPost", {
      json: { data: { caption: newVal } },
    })
    .json<{ result: { caption: string } }>();
});
</script>

<template>
  <SkeletonMyPost v-if="isLoading" :hide-details="true" class="mt-12 w-2/3" />

  <span v-else-if="isError">Error: {{ error }}</span>
  <p v-else-if="!myPost">Post a BeReal to add a caption</p>

  <MyPost
    v-if="myPost"
    :post="myPost"
    :hide-realmojis="true"
    :hide-details="true"
    class="mx-auto mt-16 w-2/3"
  />
  {{ caption }}

  <div
    class="container fixed bottom-0 right-0 left-0 mx-auto max-w-lg sm:mb-10"
  >
    <label for="caption" class="sr-only">Caption</label>
    <input
      id="caption"
      v-model.lazy="caption"
      class="w-full border-t-2 border-zinc-800 bg-transparent px-3 py-2 placeholder:text-zinc-500 sm:rounded-lg sm:border-2 sm:bg-zinc-900"
      placeholder="Add a caption"
      focus
    />
  </div>
</template>
