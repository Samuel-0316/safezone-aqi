"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { handleLocationSubmit } from "@/lib/handlers";

const LocationInput = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLocationSubmit(new FormData(e.target as HTMLFormElement));
      }}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="text"
        name="location"
        placeholder="Enter location"
        className="border-gray-700 bg-gray-800 text-gray-100 focus:border-green-500"
      />
      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

export default LocationInput;
