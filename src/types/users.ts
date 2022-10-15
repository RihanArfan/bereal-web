import type { Device, Picture } from "@/types/types";
import type { Realmoji } from "@/types/realmojis";

export interface User {
  id: string;
  username: string;
  profilePicture?: Picture;
}

export interface Friend extends User {
  fullname: string;
  status: string;
}

export interface Account extends User {
  birthdate: string;
  fullname: string;
  realmojis?: Realmoji[];
  devices: Device[];
  stats: {
    postTotal: number;
  };
  canDeletePost: boolean;
  canUpdateRegion: boolean;
  phoneNumber: string;
  biography: string;
  location: string;
  countryCode: string;
  region: string;
  createdAt: string;
}

// profiles
export interface Profile {
  id: string;
  username: string;
  fullname: string;
  biography?: string;
  location?: string;
  profilePicture?: Picture;
  relationship: {
    status: string;
    commonFriends: CommonFriends;
    friendedAt: string;
  };
  createdAt: string;
}

export interface CommonFriends {
  sample: CommonFriend[];
  total: number;
}

export interface CommonFriend extends User {
  fullname: string;
}

export interface SearchProfile {
  id: string;
  username: string;
  fullname: string;
  location?: string;
  profilePicture?: Picture;
  status: string;
  mutualFriends: number;
}

export interface BlockedUser {
  userId: string;
  blockedAt: Date;
  user: Omit<Friend, "status">;
}
