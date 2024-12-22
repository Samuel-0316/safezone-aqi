"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { handleLocationSubmit } from "@/lib/handlers";

const LocationInput = () => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("location", location);
    handleLocationSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-sm items-center"
    >
      <Input
        type="text"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        className="dark:hover:bg-gray-750 w-full rounded-full border border-gray-200 bg-white py-2 pl-4 pr-12 text-gray-900 shadow-sm transition-colors duration-200 placeholder:text-gray-500 hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
        aria-label="Location search"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-backgroundlight text-white shadow-md transition-colors duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500/20 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400/20"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default LocationInput;
