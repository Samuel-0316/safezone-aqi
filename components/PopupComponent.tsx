"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAirQuality } from "@/lib/meersens_api/AIRQuality";
import { Location } from "@/lib/osm/OSMTypes";
import { AirQualityResponse } from "@/lib/meersens_api/AIRQualityTypes";
import { PollenQualityResponse } from "@/lib/meersens_api/PollenTypes";
import { WaterQualityResponse } from "@/lib/meersens_api/WaterQualityTypes";
import { getPollenResponse } from "@/lib/meersens_api/Pollen";
import { getWaterQuality } from "@/lib/meersens_api/WaterQuality";

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const getAQIColor = (value: number): string => {
  if (value <= 50) return "bg-green-500";
  if (value <= 100) return "bg-yellow-500";
  if (value <= 150) return "bg-orange-500";
  if (value <= 200) return "bg-red-500";
  if (value <= 300) return "bg-purple-500";
  return "bg-red-900";
};

interface PopupComponentProps {
  location: Location;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ location }) => {
  const [aqi, setAqi] = useState<AirQualityResponse | null>(null);
  const [pollen, setPollen] = useState<PollenQualityResponse | null>(null);
  const [water, setWater] = useState<WaterQualityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (isLoading || aqi) return;

    try {
      setIsLoading(true);
      setError(null);
      const [aqiData, pollenData, waterData] = await Promise.all([
        getAirQuality(location.lat, location.lon),
        getPollenResponse(location.lat, location.lon),
        getWaterQuality(location.lat, location.lon),
      ]);

      setAqi(aqiData);
      setPollen(pollenData);
      setWater(waterData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to load environmental data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [location.lat, location.lon, isLoading, aqi]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <Popup>Loading environmental data...</Popup>;
  }

  if (error) {
    return <Popup>{error}</Popup>;
  }

  if (!aqi) {
    return <Popup>No environmental data available.</Popup>;
  }

  const availableTabs = [
    { id: "air", label: "Air Quality", available: true },
    { id: "pollen", label: "Pollen", available: pollen?.found },
    { id: "water", label: "Water Quality", available: water?.found },
  ].filter((tab) => tab.available);

  return (
    <Popup>
      <div className="text-sm sm:text-base">
        <h2 className="mb-2 font-bold">{location.display_name}</h2>
        <div
          className={`inline-block rounded-full px-2 py-1 text-white ${getAQIColor(aqi.index.value)}`}
        >
          AQI: {aqi.index.value}
        </div>
        <p className="mt-2 text-xs sm:text-sm">{aqi.index.description}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 text-xs sm:text-sm">View Details</Button>
          </DialogTrigger>
          <DialogContent className="w-11/12 max-w-4xl bg-white text-black dark:bg-gray-800 dark:text-white sm:w-full">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                Environmental Details for {location.display_name}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Available Environmental Information
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="air" className="mt-4">
              <TabsList>
                {availableTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="air">
                <h3 className="mb-2 text-base font-semibold sm:text-lg">
                  Air Quality Index: {aqi.index.value}
                </h3>
                <p className="mb-4 text-sm">{aqi.index.description}</p>
                <h4 className="mb-2 text-sm font-semibold">Pollutants:</h4>
                <ul className="text-sm">
                  {Object.entries(aqi.pollutants).map(([key, pollutant]) => (
                    <li key={key} className="mb-2">
                      <span className="font-medium">{pollutant.name}:</span>{" "}
                      {pollutant.value} {pollutant.unit}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              {pollen?.found && (
                <TabsContent value="pollen">
                  <h3 className="mb-2 text-base font-semibold sm:text-lg">
                    Pollen Index: {pollen.index.value} (
                    {pollen.index.qualification})
                  </h3>
                  <p className="mb-4 text-sm">
                    Main Pollutants: {pollen.index.main_pollutants.join(", ")}
                  </p>
                  <h4 className="mb-2 text-sm font-semibold">Pollen Types:</h4>
                  <ul className="text-sm">
                    {Object.entries(pollen.pollutants).map(
                      ([key, pollenData]) => (
                        <li key={key} className="mb-2">
                          <span className="font-medium">
                            {pollenData.name}:
                          </span>{" "}
                          {pollenData.value} {pollenData.unit} (Index:{" "}
                          {pollenData.index.value} -{" "}
                          {pollenData.index.qualification})
                        </li>
                      ),
                    )}
                  </ul>
                </TabsContent>
              )}
              {water?.found && (
                <TabsContent value="water">
                  <h3 className="mb-2 text-base font-semibold sm:text-lg">
                    Water Quality Index: {water.index.value} (
                    {water.index.qualification})
                  </h3>
                  <p className="mb-4 text-sm">
                    Main Pollutants: {water.index.main_pollutants.join(", ")}
                  </p>
                  <h4 className="mb-2 text-sm font-semibold">
                    Water Pollutants:
                  </h4>
                  <ul className="text-sm">
                    {Object.entries(water.pollutants).map(
                      ([key, pollutantData]) => (
                        <li key={key} className="mb-2">
                          <span className="font-medium">
                            {pollutantData.name}:
                          </span>{" "}
                          {pollutantData.value} {pollutantData.unit} (Index:{" "}
                          {pollutantData.index.value} -{" "}
                          {pollutantData.index.qualification})
                        </li>
                      ),
                    )}
                  </ul>
                </TabsContent>
              )}
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </Popup>
  );
};

export default PopupComponent;
