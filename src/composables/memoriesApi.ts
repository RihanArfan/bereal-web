import { useApi } from "@/composables/useApi";

export const useMemoriesQuery = () => {
  const fetcher = async () => await useApi().get("feeds/memories").json();

  const options = {
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 1 week
  };

  return useQuery(["memories"], fetcher, options);
};

export const useMemoryQuery = (id: string | number) => {
  const fetcher = async () => await useApi().get(`feeds/memories/${id}`).json();

  const options = {
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 1 week
  };

  return useQuery(["memories"], fetcher, options);
};
