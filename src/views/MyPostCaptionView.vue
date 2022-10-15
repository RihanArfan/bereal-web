<script setup lang="ts">
const { isLoading, isError, data, error } = usePostQuery("me");

const caption = ref<string>("");
watch(data, (newVal) => (caption.value = newVal?.caption ?? ""));
watch(caption, async (newVal) => mutate(newVal));

const {
  isLoading: isUpdateLoading,
  isError: isUpdateError,
  error: updateError,
  mutate,
} = useUpdateCaptionMutation();
</script>

<template>
  <SkeletonMyPost v-if="isLoading" :hide-details="true" class="mt-12 w-2/3" />

  <span v-else-if="isError">Error: {{ error }}</span>
  <p v-else-if="!data">Post a BeReal to add a caption</p>

  <MyPost
    v-if="data"
    :post="data"
    :hide-realmojis="true"
    :hide-details="true"
    class="mx-auto mt-16 w-2/3"
  />

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
