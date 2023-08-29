export const useFetchFriendsFeed = async () =>
  await $fetch("/api/feeds/friends");
