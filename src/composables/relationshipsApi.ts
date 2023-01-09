import { useApi } from "@/composables/useApi";
import type { PaginatedResults } from "@/types/types";
import type { Friend } from "@/types/users";

export function useFriendsQuery() {
  const fetcher = async () =>
    await useApi()
      .get("relationships/friends")
      .json<PaginatedResults<Friend>>();

  return useQuery(["friends"], fetcher);
}
