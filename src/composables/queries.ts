import ky from "ky";
import { useQuery } from "vue-query";
import type { MaybeRef } from "@vueuse/core";

import { useApi } from "@/composables/useApi";
import type { ReverseGeolocationResponse } from "@/types/geolocation";
import type { Post } from "@/types/types";

export function useFriendsFeedQuery() {
  const fetcher = async (): Promise<Post[]> =>
    await useApi().get("feeds/friends").json<Post[]>();

  return useQuery(["friends-feed"], fetcher, {
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function useLocationQuery(
  latitude: number,
  longitude: number,
  { enabled }: { enabled: MaybeRef<boolean | undefined> }
) {
  const fetcher = async () =>
    await ky
      .get(
        `https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}`,
        {
          searchParams: {
            includeEntityTypes: "PopulatedPlace",
            key: import.meta.env.VITE_BING_MAPS_KEY,
          },
        }
      )
      .json<ReverseGeolocationResponse>();

  return useQuery(["geolocation", latitude, longitude], fetcher, {
    enabled,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
