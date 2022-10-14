import ky from "ky";
import { useQuery } from "@tanstack/vue-query";
import type { MaybeRef } from "@tanstack/vue-query/build/lib/types";

import type { ReverseGeolocationResponse } from "@/types/geolocation";

export const useLocationQuery = (
  latitude: number,
  longitude: number,
  { enabled }: { enabled: MaybeRef<boolean | undefined> }
) => {
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
};
