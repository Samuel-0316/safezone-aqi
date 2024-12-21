import { getAirQuality } from "@/lib/meersens_api/AIRQuality";
import { fetchOSMCoordinates } from "@/lib/osm/Coordinates";
import Map from "@/components/Map";

export const dynamic = "force-dynamic";

export default async function MapPage({
  searchParams,
}: {
  searchParams: { location: string };
}) {
  const { location } = await searchParams;

  if (!location) {
    //TODO: Handle this better
    alert("No location provided");
    return;
  }

  try {
    const osmData = await fetchOSMCoordinates(location);
    const [lon, lat] = osmData.features[0].geometry.coordinates;
    const name = osmData.features[0].properties.display_name;

    const aqi = await getAirQuality(lat, lon);

    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black">
        <Map lat={lat} lon={lon} name={name} aqi={aqi} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500">
        <p>{String(error)}</p>
      </div>
    );
  }
}
