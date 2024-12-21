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
    <div className="relative h-[600px] w-[800px] rounded-lg shadow-lg">
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        {/*TODO: change this to geoapify later */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            <div>
              <h2 className="mb-2 font-bold">{name}</h2>
              <div
                className={`inline-block rounded-full px-2 py-1 text-white ${getAQIColor(aqi.index.value)}`}
              >
                AQI: {aqi.index.value}
              </div>
              <p className="mt-2">{aqi.index.description}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4">View Details</Button>
                </DialogTrigger>
                <DialogContent className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-black text-white">
                  <DialogHeader>
                    <DialogTitle>Air Quality Details for {name}</DialogTitle>
                    <DialogDescription className="hidden">
                      {" "}
                      {aqi.index.description}{" "}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <h3 className="mb-2 text-lg font-semibold">Pollutants:</h3>
                    <ul>
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