import { useQuery } from "@tanstack/vue-query";
import type { MaybeRef } from "@vueuse/core";
import type { MyProfile } from "@/types/users";

export const useMyProfileQuery = ({
  enabled = true,
}: { enabled?: MaybeRef<boolean | undefined> } = {}) => {
  const fetcher = async () => await useApi().get("person/me").json<MyProfile>();

  return useQuery(["profile", "me"], fetcher, { enabled });
};
