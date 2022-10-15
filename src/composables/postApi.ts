import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useApi } from "@/composables/useApi";
import type { DiscoveryPost, Post } from "@/types/posts";

export const useFriendsFeedQuery = () => {
  const fetcher = async () =>
    await useApi().get("feeds/friends").json<DiscoveryPost[]>();

  return useQuery(["friends-feed"], fetcher);
};

export const usePostQuery = (id: string) => {
  const fetcher = async () =>
    await useApi().get(`content/posts/${id}`).json<Post>();

  return useQuery(["post", id], fetcher);
};

export const useUpdateCaptionMutation = () => {
  const queryClient = useQueryClient();

  const mutator = async (newCaption: string) =>
    await useApi()
      .patch("content/posts/caption", { json: { caption: newCaption } })
      .json<Post>();

  return useMutation((newCaption: string) => mutator(newCaption), {
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData<Post>(["post", "me"], newPost);
    },
  });
};
