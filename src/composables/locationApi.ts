import ky from "ky";
import type { MaybeRef } from "@tanstack/vue-query/build/lib/types";

import type { ReverseGeolocationResponse } from "@/types/geolocation";

export const useLocationQuery = (
  latitude: number,
  longitude: number,
  { enabled }: { enabled: MaybeRef<boolean | undefined> }
) => {
  const fetcher = async () => {
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}`;
    const data = await ky
      .get(url, {
        searchParams: {
          includeEntityTypes: "PopulatedPlace",
          key: import.meta.env.VITE_BING_MAPS_KEY,
        },
      })
      .json<ReverseGeolocationResponse>();

    return data?.resourceSets[0].resources[0];
  };

  return useQuery(["geolocation", latitude, longitude], fetcher, {
    enabled,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
