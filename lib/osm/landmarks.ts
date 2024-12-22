import { FeatureCollection } from "./landmarkTypes";

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

type LandMark = {
  name: string;
  latitude: number;
  longitude: number;
};

export const getLandMarkProximityArray = (
  featurescollection: FeatureCollection,
) => {
  const proximityArray: LandMark[] = [];
  for (const feature of featurescollection.features) {
    proximityArray.push({
      name: feature.properties.name,
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
    });
  }
  return proximityArray;
};
