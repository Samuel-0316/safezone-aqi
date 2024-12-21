import { GeoJSONResponse } from "./OSMTypes";

export const fetchOSMCoordinates = async (
  location: string,
): Promise<GeoJSONResponse> => {
  if (location.trim() === "") {
    throw new Error("Location cannot be empty");
  }
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${location.trim()}&format=geojson`,
    );
    const data: GeoJSONResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Location not found ${error}`);
  }
};
