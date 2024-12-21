"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { AirQualityResponse } from "@/lib/meersens_api/AIRQualityTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => ({ default: mod.MapContainer })),
  { ssr: false },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => ({ default: mod.TileLayer })),
  { ssr: false },
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => ({ default: mod.Marker })),
  { ssr: false },
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => ({ default: mod.Popup })),
  { ssr: false },
);

const MapComponent = ({
  lat,
  lon,
  name,
  aqi,
}: {
  lat: number;
  lon: number;
  name: string;
  aqi: AirQualityResponse;
}) => {
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const DefaultIcon = L.icon({
        iconUrl: icon.toString(),
        shadowUrl: iconShadow.toString(),
      });
      L.Marker.prototype.options.icon = DefaultIcon;
      setLeaflet(L);
    });
  }, []);

  if (!leaflet) {
    return <div>Loading map...</div>;
  }

  const getAQIColor = (value: number) => {
    if (value <= 50) return "bg-green-500";
    if (value <= 100) return "bg-yellow-500";
    if (value <= 150) return "bg-orange-500";
    if (value <= 200) return "bg-red-500";
    if (value <= 300) return "bg-purple-500";
    return "bg-maroon-500";
  };

  return (
    <div className="relative h-[300px] w-[400px] rounded-lg shadow-lg sm:h-[400px] sm:w-[700px] md:h-[500px] md:w-[800px] lg:h-[600px] lg:w-[900px]">
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            <div className="text-sm sm:text-base">
              <h2 className="mb-2 font-bold">{name}</h2>
              <div
                className={`inline-block rounded-full px-2 py-1 text-white ${getAQIColor(aqi.index.value)}`}
              >
                AQI: {aqi.index.value}
              </div>
              <p className="mt-2 text-xs sm:text-sm">{aqi.index.description}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 text-xs sm:text-sm">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-11/12 max-w-lg bg-white text-black dark:bg-gray-800 dark:text-white sm:w-full">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">
                      Air Quality Details for {name}
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
                      {Object.entries(aqi?.pollutants).map(
                        ([key, pollutant]) => (
                          <li key={key} className="mb-2">
                            <span className="font-medium">
                              {pollutant.name}:
                            </span>{" "}
                            {pollutant.value} {pollutant.unit}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
