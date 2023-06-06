import type { Device, Media } from "./types";
import type { RealMoji } from "./posts";

export interface User {
  id: string;
  username: string;
  profilePicture?: Media;
}

// Profiles
export interface Friend extends User {
  fullname: string;
  status: string;
}

export interface Profile {
  id: string;
  username: string;
  fullname: string;
  biography?: string;
  location?: string;
  profilePicture?: Media;
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

export interface SearchProfile extends User {
  fullname: string;
  location?: string;
  status: string;
  mutualFriends: number;
}

export interface BlockedUser {
  userId: string;
  blockedAt: Date;
  user: Omit<Friend, "status">;
}

export interface FriendSuggestion extends User {
  fullname: string;
  mutualFriends: number;
}

// Account
export interface Account extends User {
  birthdate: string;
  fullname: string;
  realmojis?: RealMoji[];
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

export interface Memory {
  id: string;
  primary: Media;
  secondary: Media;
  thumbnail?: Media;
  memoryDay: string;
  isLate: boolean;
}

export interface Root {
  next: string | null;
  memoriesSynchronized: boolean;
}
