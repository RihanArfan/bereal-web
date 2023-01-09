import type { MaybeRef } from "@vueuse/core";
import type { Results } from "@/types/types";
import type { Profile, SearchProfile } from "@/types/users";

export const useProfileQuery = (
  id: MaybeRef<string>,
  { enabled = true }: { enabled?: MaybeRef<boolean | undefined> } = {}
) => {
  const fetcher = async () =>
    await useApi()
      .get(`person/profiles/${unref(id)}`)
      .json<Profile>();

  return useQuery(["profile", id], fetcher, { enabled });
};

export const useSearchProfileQuery = (
  query: MaybeRef<string>,
  { enabled = true }: { enabled?: MaybeRef<boolean | undefined> } = {}
) => {
  const fetcher = async () =>
    await useApi()
      .get(`search/profile`, { searchParams: { query: unref(query) } })
      .json<Results<SearchProfile>>();

  return useQuery(["profile-search", query], fetcher, { enabled });
};
