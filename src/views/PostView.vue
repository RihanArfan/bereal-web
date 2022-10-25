<script setup lang="ts">
const route = useRoute();
const { isLoading, data } = usePostQuery(route.params.id as string);

const {
  isLoading: isRealmojisLoading,
  isError: isRealmojisError,
  data: realmojis,
  error: realmojisError,
} = useRealmojiQuery(route.params.id as string, { enabled: true });
</script>

<template>
  <SkeletonMyPost
    v-if="isLoading"
    :hide-details="true"
    class="mx-auto mt-3 sm:mt-9 sm:w-2/3"
  />

  <template v-if="data">
    <MyPost
      v-if="data"
      :post="data"
      :hide-realmojis="true"
      :hide-details="true"
      class="mx-auto mt-3 mb-3 sm:mt-9 sm:w-2/3"
    />

    <RouterLink
      v-if="data.canDelete"
      :to="{ name: 'caption' }"
      class="text-md block cursor-pointer px-3 text-center font-medium"
    >
      {{ data.caption }}
      <template v-if="!data.caption">Add a caption...</template>
    </RouterLink>

    <p
      v-else-if="data.caption"
      class="text-md cursor-pointer px-3 text-center font-medium"
    >
      {{ data.caption }}
    </p>

    <div
      v-if="!realmojis?.data.length && !data.comments.total"
      class="mt-3 text-center"
    >
      <p class="fw-bold text-xl">It's quiet here...</p>
      <p>Be the first to react or comment</p>
    </div>

    <div
      v-if="realmojis?.data.length"
      class="mt-3 overflow-x-auto border-t border-zinc-900 pt-3"
    >
      <RealMojis
        class="gap-3"
        :realmojis="realmojis.data"
        :total="realmojis.data.length"
        :limit="100"
      />
    </div>

    <div
      v-if="data.comments.total || data.realmojis.total"
      class="mt-3 border-t border-zinc-900 py-3"
    >
      <p v-if="!data.comments.total">No comments</p>

      <div v-for="comment in data.comments.sample" :key="comment.id">
        <RouterLink
          class="flex items-center rounded-lg py-1 px-2"
          :to="{ name: 'profile', params: { username: comment.user.username } }"
        >
          <UserIcon
            :profile-picture="comment.user.profilePicture"
            :username="comment.user.username"
            class="mr-3"
          />
        </RouterLink>

        <div>
          <p class="text-md font-medium leading-tight">
            {{ comment.user.username }}
          </p>

          <p class="text-gray-500">
            {{ comment.content }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>
