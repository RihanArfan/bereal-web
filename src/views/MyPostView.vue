<script setup lang="ts">
const { isLoading, data } = usePostQuery("me");

const {
  isLoading: isRealmojisLoading,
  isError: isRealmojisError,
  data: realmojis,
  error: realmojisError,
} = useRealmojiQuery(data.value?.id ?? "", { enabled: !!data.value });
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
      :hide-details="false"
      class="mx-auto mt-3 sm:mt-9 sm:w-2/3"
    />

    <div class="mt-2 overflow-x-auto border-t border-zinc-900 py-2">
      <UserPostRealMojis
        v-if="realmojis"
        class="gap-3"
        :realmojis="realmojis.data"
        :total="realmojis.data.length"
        :limit="100"
      />
    </div>

    <div class="border-t-2 border-zinc-500 border-opacity-10 py-2">
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
