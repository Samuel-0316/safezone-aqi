import LocationInput from "@/components/LocationInput";

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-[url('/plague-male.jpg')] bg-cover bg-center p-2 text-gray-100">
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center space-y-6 p-8">
        <div className="w-full max-w-md rounded-xl bg-black/40 p-6 backdrop-blur-md">
          <LocationInput />
        </div>
        <p className="max-w-md text-center text-xl italic text-gray-200">
          Unmask the safest havens in your vicinity guided by the wisdom of the
          Plague Doctor.
        </p>
      </div>
    </div>
  );
}
