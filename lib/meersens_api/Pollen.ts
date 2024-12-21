import { PollenQualityResponse } from "./PollenTypes";

export const getPollenResponse = async (
  latitude: number,
  longitude: number,
): Promise<PollenQualityResponse> => {
  if (!process.env.MEERSEENS_API_KEY) {
    throw new Error("MEERSEENS_API_KEY is not set");
  }
  const response = await fetch(
    `https://api.meersens.com/environment/public/pollen/current?lat=${latitude}&lng=${longitude}&apikey=${process.env.MEERSEENS_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status} ${response.statusText}`);
  }
  const data: PollenQualityResponse = await response.json();
  if (!data) {
    throw new Error("No data found for the given coordinates");
  }
  return data;
};

export const getPollenMap = async (response: PollenQualityResponse) => {
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
