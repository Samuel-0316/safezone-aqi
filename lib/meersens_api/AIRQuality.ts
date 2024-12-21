import { AirQualityResponse } from "./AIRQualityTypes";

export const getAirQuality = async (
  latitude: number,
  longitude: number,
): Promise<AirQualityResponse> => {
  if (!process.env.MEERSENS_API_KEY) {
    throw new Error("MEERSEENS_API_KEY is not set");
  }
  const response = await fetch(
    `https://api.meersens.com/environment/public/air/current?lat=${latitude}&lng=${longitude}&apikey=${process.env.MEERSENS_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status} ${response.statusText}`);
  }
  const data: AirQualityResponse = await response.json();
  if (!data) {
    throw new Error("No data found for the given coordinates");
  }
  return data;
};

export const getPollutantMap = async (
  res: AirQualityResponse,
): Promise<Record<string, number>> => {
  const pollutantAndValues: Record<string, number> = {};
  for (const key in res.pollutants) {
    const pollutant = res.pollutants[key];
    pollutantAndValues[pollutant.name] = pollutant.value;
  }
  return pollutantAndValues;
};
