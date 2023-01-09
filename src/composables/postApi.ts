import type { MaybeRef } from "@tanstack/vue-query/build/lib/types";
import { useApi } from "@/composables/useApi";

import type { PaginatedResults } from "@/types/types";
import type { DiscoveryPost, Post, Comment } from "@/types/posts";
import type { PostRealmoji } from "@/types/realmojis";
import dayjs from "dayjs";

export const useFriendsFeedQuery = () => {
  const fetcher = async () => {
    const data = await useApi().get("feeds/friends").json<DiscoveryPost[]>();
    return data.map(feedToPost);
  };

  return useQuery({
    queryKey: ["friends-feed"],
    queryFn: fetcher,
    cacheTime: 1000 * 60 * 60 * 36, // 36 hours
  });
};

export const usePostQuery = (id: string) => {
  const fetcher = async () =>
    await useApi().get(`content/posts/${id}`).json<Post>();

  return useQuery(["post", id], fetcher);
};

export const useRealmojiQuery = (
  id: string,
  { enabled }: { enabled: MaybeRef<boolean | undefined> }
) => {
  const fetcher = async () =>
    await useApi()
      .get("content/realmojis", { searchParams: { postId: id } })
      .json<PaginatedResults<PostRealmoji>>();

  return useQuery(["post", "realmoji", id], fetcher, { enabled });
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

/**
 * Converts a post with the type returned by the feed endpoints to a post with the type returned from the content API.
 *
 * @param post
 */
export const feedToPost = (post: DiscoveryPost): Post => ({
  id: post.id,
  user: post.user,
  primary: {
    url: post.photoURL,
    width: post.imageWidth,
    height: post.imageHeight,
  },
  secondary: {
    url: post.secondaryPhotoURL,
    width: post.secondaryImageWidth,
    height: post.secondaryImageHeight,
  },
  location: post.location
    ? {
        latitude: post.location?._latitude,
        longitude: post.location?._longitude,
      }
    : undefined,
  caption: post.caption ?? null,
  retakeCounter: post.retakeCounter,
  isLate: !!post.lateInSeconds,
  lateInSeconds: post.lateInSeconds ?? null,
  visibility: ["friends"],
  moment: {
    id: post.id,
    region: post.region,
  },
  screenshots: {
    sample: post.screenshotsV2,
    total: post.screenshotsV2?.length,
  },
  comments: {
    sample: post.comment.map(
      (comment): Comment => ({
        id: comment.id,
        user: comment.user,
        content: comment.text,
        postedAt: dayjs(comment.creationDate._seconds * 1000).toJSON(),
      })
    ),
    total: post.comment?.length,
  },
  realmojis: {
    sample: post.realMojis.map(
      (realmoji): PostRealmoji => ({
        id: realmoji.id,
        user: realmoji.user,
        emoji: realmoji.emoji,
        isInstant: realmoji.type === "instant",
        media: {
          url: realmoji.uri,
          width: 500,
          height: 500,
        },
        postedAt: dayjs(realmoji.date._seconds * 1000).toJSON(),
      })
    ),
    total: post.realMojis?.length,
  },
  createdAt: dayjs(post.creationDate._seconds * 1000).toJSON(),
  takenAt: dayjs(post.takenAt._seconds * 1000).toJSON(),
});
