"use client";

import { useEffect, useState } from "react";
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
import { getAirQuality } from "@/lib/meersens_api/AIRQuality";
import { Location } from "@/lib/osm/OSMTypes";
import { AirQualityResponse } from "@/lib/meersens_api/AIRQualityTypes";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAqi = async () => {
      try {
        setIsLoading(true);
        const aqiData = await getAirQuality(location.lat, location.lon);
        setAqi(aqiData);
      } catch (error) {
        console.error("Failed to fetch AQI data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAqi();
  }, [location.lat, location.lon]);

  if (isLoading) {
    return <Popup>Loading air quality data...</Popup>;
  }

  if (!aqi) {
    return <Popup>Failed to load air quality data.</Popup>;
  }

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
          <DialogContent className="w-11/12 max-w-lg bg-white text-black dark:bg-gray-800 dark:text-white sm:w-full">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                Air Quality Details for {location.display_name}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {aqi.index.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h3 className="mb-2 text-base font-semibold sm:text-lg">
                Pollutants:
              </h3>
              <ul className="text-sm sm:text-base">
                {Object.entries(aqi.pollutants).map(([key, pollutant]) => (
                  <li key={key} className="mb-2">
                    <span className="font-medium">{pollutant.name}:</span>{" "}
                    {pollutant.value} {pollutant.unit}
                  </li>
                ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Popup>
  );
};

export default PopupComponent;
