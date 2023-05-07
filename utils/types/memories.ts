import type { Picture } from "@/types/types";

export interface Memory {
  id: string;
  primary: Picture;
  secondary: Picture;
  thumbnail?: Picture;
  memoryDay: string;
  isLate: boolean;
}

export interface Root {
  next: string | null;
  memoriesSynchronized: boolean;
}