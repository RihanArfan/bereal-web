import type {
  DiscoveryLocation,
  Location,
  Picture,
  Sample,
  Timestamp,
} from "@/types/types";
import type { DiscoveryRealmoji, PostRealmoji } from "@/types/realmojis";
import type { User } from "@/types/users";

export interface Post {
  user: User;
  id: string;
  primary: Picture;
  secondary: Picture;
  isLate: boolean;
  lateInSeconds: number;
  retakeCounter: number;
  canDelete?: boolean;
  visibility?: ["public" | "friends"];
  moment: {
    id: string;
    region: string;
  };
  location?: Location;
  caption: string | null;
  comments: Sample<Comment>;
  realmojis: Sample<PostRealmoji>;
  screenshots: Sample<any>;
  createdAt: string;
  takenAt: string;
}

export interface DiscoveryPost {
  id: string;
  notificationID: string;
  ownerID: string;
  userName: string;
  user: User;
  mediaType: "photo" | "late";
  region: string;
  bucket: string;
  photoURL: string;
  imageWidth: number;
  imageHeight: number;
  secondaryPhotoURL: string;
  secondaryImageHeight: number;
  secondaryImageWidth: number;
  members: string[];
  lateInSeconds: number;
  isPublic: boolean;
  location?: DiscoveryLocation;
  caption?: string;
  retakeCounter: number;
  creationDate: Timestamp;
  updatedAt: number;
  takenAt: Timestamp;
  comment: DiscoveryComment[];
  realMojis: DiscoveryRealmoji[];
  screenshots: any[];
  screenshotsV2: any[];
  visibility: ["public" | "friends"];
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  postedAt: string;
}

export interface DiscoveryComment {
  id: string;
  uid: string;
  userName: string;
  user: User;
  text: string;
  creationDate: Timestamp;
}
