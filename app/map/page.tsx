import { fetchOSMCoordinates } from "@/lib/osm/Coordinates";
import Map from "@/components/Map";
import { getLandMarkProximityArray, getLandMarks } from "@/lib/osm/landmarks";

export const dynamic = "force-dynamic";

export default async function MapPage({
  searchParams,
}: {
  searchParams: { search_query: string };
}) {
  const { search_query } = await searchParams;

  if (!search_query) {
    //TODO: Handle this better
    alert("No location provided");
    return;
  }

  try {
    const currentLocation = await fetchOSMCoordinates(search_query);
    const landmarkResponse = await getLandMarks(
      currentLocation.lat,
      currentLocation.lon,
      [
        "commercial",
        "education",
        "accommodation",
        "entertainment",
        "healthcare",
      ],
      5000,
    );
    const landmarkArray = getLandMarkProximityArray(landmarkResponse);

    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-300 dark:bg-black">
        <Map currentLocation={currentLocation} landmarkArray={landmarkArray} />
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
