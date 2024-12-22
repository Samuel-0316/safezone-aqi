"use client";

import dynamic from "next/dynamic";
import { Location } from "@/lib/osm/OSMTypes";
import { useEffect, useState, useMemo } from "react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import PopupComponent from "./PopupComponent";

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

const MapComponent = ({
  currentLocation,
  landmarkArray,
}: {
  currentLocation: Location;
  landmarkArray: Location[];
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

  const memoizedPopups = useMemo(() => {
    return [currentLocation, ...landmarkArray].map((location, index) => (
      <Marker key={index} position={[location.lat, location.lon]}>
        <PopupComponent location={location} />
      </Marker>
    ));
  }, [currentLocation, landmarkArray]);

  if (!leaflet) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="relative h-[300px] w-[400px] rounded-lg shadow-lg sm:h-[400px] sm:w-[700px] md:h-[500px] md:w-[800px] lg:h-[600px] lg:w-[900px]">
      <MapContainer
        center={[currentLocation.lat, currentLocation.lon]}
        zoom={16}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {memoizedPopups}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
