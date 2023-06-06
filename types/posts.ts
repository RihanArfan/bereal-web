import type { Media } from "./types";
import type { User } from "./users";
export interface Posts {
  user: User;
  momentId: string;
  region: string; // TODO: Specify all possible values
  posts: Post[];
}

export interface Post {
  id: string;
  visibility: ["friends" | "friends-of-friends" | "public"];
  primary: Media;
  secondary: Media;
  location?: Location;
  caption?: string;

  unblurCount?: number;
  retakeCounter: number;
  lateInSeconds: number;
  isLate: boolean;
  isMain: boolean;

  realMojis: RealMoji[];
  comments: Comment[];
  music?: Music;

  takenAt: Date;
  creationDate: Date;
  updatedAt: Date;
}

export interface Location {
  longitude: number;
  latitude: number;
}

export interface RealMoji {
  id: string;
  user: User;
  media: Media;
  type: string;
  emoji: string;
  isInstant: boolean;
  postedAt: Date;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  postedAt: Date;
}

export interface Music {
  isrc: string;
  openUrl: string;
  visibility: string;
  track: string;
  artist: string;
  provider: string;
  providerId: string;
  artwork: string;
  audioType: string;
}

export interface FriendsFeed {
  userPosts: Posts;
  friendsPosts: Posts[];
  remainingPosts: number;
  maxPostsPerMoment: number;
}
