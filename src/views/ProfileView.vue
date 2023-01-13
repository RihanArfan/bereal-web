<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type {
  Friend,
  FriendSuggestion,
  Profile,
  SearchProfile,
} from "@/types/users";
import type { PaginatedResults, Results } from "@/types/types";
import type { DiscoveryPost } from "@/types/posts";

dayjs.extend(relativeTime);

const route = useRoute();

const getIdFromUsernameInCache = async (username: string) => {
  const queryClient = useQueryClient();

  // search queryCache for username on friends-feed[].user.username, friends[].username, friend-suggestions[].username and return id if found
  const friendsFeed = queryClient.getQueryData<DiscoveryPost[]>([
    "friends-feed",
  ]);
  const friends = queryClient.getQueryData<PaginatedResults<Friend>>([
    "friends",
  ]);
  const friendSuggestions = queryClient.getQueryData<
    PaginatedResults<FriendSuggestion>
  >(["friend-suggestions"]);

  const combinedCache = [
    ...(friendsFeed?.map((f) => f.user) ?? []),
    ...(friends?.data ?? []),
    ...(friendSuggestions?.data ?? []),
  ];

  return combinedCache.find((f) => f.username === username)?.id;
};

const getIdFromUsernameFromApi = async (username: string) => {
  // search for user id by username if queryCache returns no results
  const search = await useApi()
    .get(`search/profile`, { searchParams: { query: username } })
    .json<Results<SearchProfile>>();

  const id = search.data.find((s) => s.username === username)?.id;
  if (!id) throw Error("Profile with specified username does not exist");
  return id;
};

const getIdFromUsername = async (username: string) => {
  // search the cache of existing queries to see if we can find the user id
  const id = await getIdFromUsernameInCache(username);
  if (id) return id;

  // search for user id by username if queryCache returns no results
  return await getIdFromUsernameFromApi(username);
};

const fetchProfile = async (username: string) => {
  const userId = await getIdFromUsername(username);
  return await useApi().get(`person/profiles/${userId}`).json<Profile>();
};

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["profile", route.params.username],
  queryFn: () => fetchProfile(route.params.username as string),
});
</script>

<template>
  <div
    class="h-48 rounded-b-lg bg-gray-400 bg-cover bg-center"
    :style="{ 'background-image': `url(${data?.profilePicture?.url})` }"
  >
    <div class="h-full rounded-b-lg backdrop-blur"></div>
  </div>
  <div class="relative -mt-24 flex flex-col items-center">
    <UserIcon
      :profile-picture="data?.profilePicture"
      :username="data?.username ?? route.params.username as string"
      :size="32"
      class="border-4 border-black transition-all hover:-mt-10 hover:h-64 hover:w-64 sm:delay-150"
    />

    <h1 class="mt-2 text-2xl font-semibold">
      <template v-if="isLoading">Loading...</template>
      <template v-else-if="isError"> Profile Not Found </template>
      <template v-else>{{ data?.fullname }}</template>
    </h1>

    <div class="text-center text-sm font-semibold text-zinc-600">
      <a :href="`https://bere.al/${data?.username}`" target="_blank">
        @{{ $route.params.username }}
      </a>
      <p v-if="data?.createdAt">
        Joined {{ dayjs(data?.createdAt).fromNow() }}
      </p>
    </div>
    <p class="text-sm font-semibold text-zinc-600">{{ data?.location }}</p>

    <p class="mt-1 mb-5">{{ data?.biography }}</p>
    <p v-if="error" class="mt-1 mb-5">{{ error }}</p>
  </div>
</template>
