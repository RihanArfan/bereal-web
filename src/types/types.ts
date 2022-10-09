export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface Picture {
  height: number;
  width: number;
  url: string;
}

export interface Location {
  _latitude: number;
  _longitude: number;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  id_token: string;
  user_id: string;
  project_id: string;
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

export interface Results<T> {
  data: T[];
}

export interface PaginatedResults<T> {
  data: T[];
  next: string | null;
}

export interface Sample<T> {
  sample: T[];
  total: number;
}