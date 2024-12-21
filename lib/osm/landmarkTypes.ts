export type FeatureCollection = {
  type: "FeatureCollection";
  features: Feature[];
};

type Feature = {
  type: "Feature";
  properties: Properties;
  geometry: Geometry;
};

type Properties = {
  name: string;
  country: string;
  country_code: string;
  state: string;
  county: string;
  state_district: string;
  city: string;
  postcode: string;
  district: string;
  suburb: string;
  street: string;
  housenumber?: string;
  lon: number;
  lat: number;
  state_code: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  categories: string[];
  details: string[];
  datasource: DataSource;
  commercial: Commercial;
  distance: number;
  place_id: string;
  website?: string;
  operator?: string;
};

type DataSource = {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
  raw: RawDataSource;
};

type RawDataSource = {
  name: string;
  shop: string;
  osm_id: number;
  osm_type: string;
  level?: number;
  website?: string;
  landuse?: string;
  operator?: string;
};

type Commercial = {
  type: string;
  level?: number;
};

type Geometry = {
  type: "Point";
  coordinates: [number, number];
};
