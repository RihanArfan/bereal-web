import { useQuery } from "@tanstack/vue-query";
import type { MaybeRef } from "@vueuse/core";
import type { Account } from "@/types/users";

export const useMyProfileQuery = ({
  enabled = true,
}: { enabled?: MaybeRef<boolean | undefined> } = {}) => {
  const fetcher = async () => await useApi().get("person/me").json<Account>();

  return useQuery(["profile", "me"], fetcher, { enabled });
};
