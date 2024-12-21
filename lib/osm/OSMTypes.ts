export type GeoJSONResponse = {
  type: string;
  licence: string;
  features: Feature[];
};

type Feature = {
  type: string;
  properties: Properties;
  bbox: [number, number, number, number];
  geometry: Geometry;
};

type Properties = {
  place_id: number;
  osm_type: string;
  osm_id: number;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
};

type Geometry = {
  type: string;
  coordinates: [number, number];
};
