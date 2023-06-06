export interface Media {
  url: string;
  width: number;
  height: number;
}

export interface Device {
  clientVersion: string;
  device: string;
  deviceId: string;
  pushToken: string;
  platform: string;
  language: string;
  timezone: string;
}

export interface Term {
  code: string;
  status: "ACCEPTED";
  signedAt?: string;
  termUrl: string;
  version: string;
}

export interface Result<T> {
  data: T;
}

export interface PaginatedResults<T> {
  data: T[];
  next: string | null;
}

export interface Sample<T> {
  sample: T[];
  total: number;
}
