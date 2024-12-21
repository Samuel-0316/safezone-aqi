import { WaterQualityResponse } from "./WaterQualityTypes";

export const getWaterQuality = async (
  latitude: number,
  longitude: number,
): Promise<WaterQualityResponse> => {
  if (!process.env.MEERSEENS_API_KEY) {
    throw new Error("MEERSEENS_API_KEY is not set");
  }
  const response = await fetch(
    `https://api.meersens.com/environment/public/water/current?lat=${latitude}&lng=${longitude}&apikey=${process.env.MEERSEENS_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status} ${response.statusText}`);
  }
  const data: WaterQualityResponse = await response.json();
  if (!data) {
    throw new Error("No data found for the given coordinates");
  }
  return data;
};

export const getWaterQualityMap = async (response: WaterQualityResponse) => {
  if (response.pollutants === null) {
    throw new Error("no pollutants found");
  }
  const res: Record<string, number> = {};
  for (const key in response.pollutants) {
    const pollutant = response.pollutants[key];
    res[pollutant.name] = pollutant.value;
  }
  return res;
};
