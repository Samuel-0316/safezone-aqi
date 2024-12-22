import { FeatureCollection } from "./landmarkTypes";
import { Location } from "./OSMTypes";

export const getLandMarks = async (
  latitude: number,
  longitude: number,
  categories: string[],
  limit: number,
) => {
  const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=${categories.join(",")}&filter=circle:${latitude},${longitude},${limit}&bias=proximity:${latitude},${longitude}&lang=en&limit=10&apiKey=${process.env.GEOAPIFY_API_KEY}`,
  );
  const data: FeatureCollection = await response.json();
  return data;
};

export const getLandMarkProximityArray = (
  featurescollection: FeatureCollection,
) => {
  const proximityArray: Location[] = [];
  for (const feature of featurescollection.features) {
    const latlong = feature.geometry.coordinates;
    const location: Location = {
      lat: latlong[1],
      lon: latlong[0],
      display_name: feature.properties.name,
    };
    proximityArray.push(location);
  }
  return proximityArray;
};
