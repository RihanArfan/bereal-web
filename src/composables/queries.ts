import { useQuery } from "vue-query";
import ky from "ky";

import type { MaybeRef } from "@vueuse/core";

import type { ReverseGeolocationResponse } from "@/types/geolocation";

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
