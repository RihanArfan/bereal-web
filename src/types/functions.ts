import type { Date } from "@/types/types";

export interface GetUserProfile {
  result: {
    userName: string;
    uid: string;
    counterLateBeReal: number;
    name: string;
    photoURL: string;
    creationDate: Date;
    commonFriends: any[];
  };
}
