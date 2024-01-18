<script setup lang="ts">
import type { Post } from "~/types/posts";
import type { User } from "~/types/users";

const props = defineProps<{
  post: Post;
  user: User;
}>();

// time + duration
const timeAgo = useTimeAgo(props.post.takenAt);
const lateDuration = useLateDuration(
  new Date(props.post.takenAt),
  props.post.lateInSeconds
);

// share
const { share, isSupported: isShareSupported } = useShare();

function shareProfile() {
  share({
    text: `Discover @${props.user.username} on BeReal.`,
    url: `https://bere.al/${props.user.username}`,
  });
}
</script>

<template>
  <div class="mb-2 flex items-center pl-4">
    <NuxtLink :to="`/@${user.username}`" class="flex items-center pr-3">
      <Avatar>
        <AvatarImage
          v-if="user.profilePicture"
          :src="user.profilePicture.url"
          :alt="user.username"
        />
        <AvatarFallback>{{ user.username.slice(0, 1) }}</AvatarFallback>
      </Avatar>

      <div class="ml-3">
        <p class="text-md font-medium leading-tight">
          {{ user.username }}
        </p>

        <p
          v-if="post.location || post.isLate"
          class="truncate text-xs text-[#a1a1a1]"
        >
          <span v-if="post.location && false">...</span>
          <!-- TODO: loading location -->
          <template v-else-if="post.location">
            <!-- {{ location }}  -->
            United Kingdom
          </template>

          <span v-if="post.location && post.isLate"> • </span>
          <span v-if="post.isLate" class="inline-flex">
            {{ lateDuration?.number }}
            <span
              class="mr-1 max-w-[1ch] overflow-hidden whitespace-nowrap lg:ml-0.5 lg:mr-0.5 lg:max-w-none"
            >
              {{ lateDuration?.unit }}
            </span>
            late
          </span>
        </p>
      </div>
    </NuxtLink>

    <div
      class="ml-2 flex grow items-center justify-end truncate text-sm font-medium text-gray-300"
    >
      <p :class="{ 'hidden sm:inline-block': post.isLate }">
        {{ timeAgo }}
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="link" class="px-2">
            <Icon name="heroicons:ellipsis-vertical" class="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <NuxtLink :to="`/@${user.username}`">
            <DropdownMenuItem>
              <Avatar size="sm" class="mr-2 h-4 w-4">
                <AvatarImage
                  v-if="user.profilePicture"
                  :src="user.profilePicture.url"
                  :alt="user.username"
                />
                <AvatarFallback>{{ user.username.slice(0, 1) }}</AvatarFallback>
              </Avatar>
              View Profile
            </DropdownMenuItem>
          </NuxtLink>

          <DropdownMenuItem v-if="isShareSupported" @click="shareProfile">
            <Icon name="heroicons:share-16-solid" class="mr-2" />
            Share
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <Icon name="heroicons:exclamation-triangle-16-solid" class="mr-2" />
            Report this BeReal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
