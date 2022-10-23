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
  latitude: number;
  longitude: number;
}

export interface DiscoveryLocation {
  _latitude: number;
  _longitude: number;
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
