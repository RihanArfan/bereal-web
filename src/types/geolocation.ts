export interface ReverseGeolocationResponse {
  authenticationResultCode: string;
  brandLogoUri: string;
  copyright: string;
  resourceSets: {
    estimatedTotal: number;
    resources: Resource[];
  }[];
  statusCode: number;
  statusDescription: string;
  traceId: string;
}

export interface Resource {
  __type: string;
  bbox: number[];
  name: string;
  point: Point;
  address: Address;
  confidence: string;
  entityType: string;
  geocodePoints: GeocodePoint[];
  matchCodes: string[];
}

export interface Address {
  adminDistrict: string;
  adminDistrict2: string;
  countryRegion: string;
  formattedAddress: string;
  locality: string;
}

export interface Point {
  type: string;
  coordinates: number[];
}

export interface GeocodePoint extends Point {
  calculationMethod: string;
  usageTypes: string[];
}
