import { GeoJSONResponse, Location } from "./OSMTypes";

export const fetchOSMCoordinates = async (
  query_string: string,
): Promise<Location> => {
  if (query_string.trim() === "") {
    throw new Error("Location cannot be empty");
  }
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query_string.trim()}&format=geojson`,
    );
    const data: GeoJSONResponse = await res.json();
    const location: Location = {
      lat: data.features[0].geometry.coordinates[1],
      lon: data.features[0].geometry.coordinates[0],
      display_name: data.features[0].properties.display_name,
    };

    return location;
  } catch (error) {
    throw new Error(`Location not found ${error}`);
  }
};
