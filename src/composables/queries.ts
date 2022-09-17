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
      .get("https://nominatim.openstreetmap.org/reverse", {
        searchParams: {
          format: "json",
          lat: latitude,
          lon: longitude,
        },
      })
      .json<ReverseGeolocationResponse>();

  return useQuery(["geolocation", latitude, longitude], fetcher, { enabled });
}
