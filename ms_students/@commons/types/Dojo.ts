export interface DojoAddress {
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  zip: string;
}

export interface DojoPhoto {
  url: string;
}

export interface DojoGeo {
  type: 'Point';
  coordinates: number[];
}
export interface Coordinates {
  lat: number;
  lng: number;
}
export type DojoCoordinates = Coordinates;

export interface DojoSearchParams {
  donationItems?: string[];
  city?: string;
  state?: string;
}
