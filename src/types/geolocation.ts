interface Address {
  leisure?: string;
  house_number?: string;
  road?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  town?: string;
  "ISO3166-2-lvl8"?: string;
  municipality?: string;
  state_district?: string;
  state?: string;
  "ISO3166-2-lvl4": string;
  postcode?: string;
  country: string;
  country_code: string;
}

export interface ReverseGeolocationResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}
