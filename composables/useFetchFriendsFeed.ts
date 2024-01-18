import type { FriendsFeed } from "~/types/posts";

export const useFetchFriendsFeed = async (): Promise<FriendsFeed> =>
  await $fetch("/api/feeds/friends");
