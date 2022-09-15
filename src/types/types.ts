export interface Date {
  _seconds: number;
  _nanoseconds: number;
}

export interface User {
  id: string;
  username: string;
}

export interface ProfilePicture {
  height: number;
  width: number;
  url: string;
}

export interface UserWithProfilePicture extends User {
  profilePicture: ProfilePicture;
}

export interface Friend extends UserWithProfilePicture {
  fullname: string;
  status: string;
}

export interface RealMoji {
  id: string;
  uid: string;
  userName: string;
  user: UserWithProfilePicture;
  emoji: string;
  type: string;
  uri: string;
  date: Date;
}

export interface Post {
  id: string;
  notificationID: string;
  ownerID: string;
  userName: string;
  user: User;
  mediaType: string;
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
  retakeCounter: number;
  creationDate: Date;
  updatedAt: number;
  takenAt: Date;
  comment: any[];
  realMojis: RealMoji[];
  screenshots: any[];
  screenshotsV2: any[];
}

export interface TokenRequest {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  id_token: string;
  user_id: string;
  project_id: string;
}
