import { fetchOSMCoordinates } from "@/lib/osm/Coordinates";
import Map from "@/components/Map";
import { getLandMarkProximityArray, getLandMarks } from "@/lib/osm/landmarks";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function MapContent({ searchQuery }: { searchQuery: string }) {
  try {
    const currentLocation = await fetchOSMCoordinates(searchQuery);
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
      <Map currentLocation={currentLocation} landmarkArray={landmarkArray} />
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

interface MapPageProps {
  searchParams: Promise<{ search_query: string }>;
}

export default async function MapPage({ searchParams }: MapPageProps) {
  const { search_query } = await searchParams;

  if (!search_query || search_query.trim() === "") {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500">
        <p>No location provided</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-300 dark:bg-black">
      <Suspense fallback={<div>Loading map...</div>}>
        <MapContent searchQuery={search_query} />
      </Suspense>
    </div>
  );
}
