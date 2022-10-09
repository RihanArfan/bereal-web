import type { Picture, Timestamp } from "@/types/types";
import type { User } from "@/types/users";

export interface Realmoji {
  emoji: string;
  media: Picture;
}

export interface PostRealmoji extends Realmoji {
  id: string;
  user: User;
  isInstant: boolean;
  postedAt: Date;
}

export interface DiscoveryRealmoji {
  id: string;
  uid: string;
  userName: string;
  user: User;
  emoji: string;
  type: string;
  uri: string;
  date: Timestamp;
}
