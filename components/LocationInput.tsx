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
        className="border-primary focus:ring-primary w-full rounded-full border-2 py-2 pl-4 pr-12 focus:border-transparent focus:ring-2 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        aria-label="Location search"
      />
      <Button
        type="submit"
        size="icon"
        className="bg-primary hover:bg-primary/90 absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-300 shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <Search className="h-4 w-4 text-white dark:text-gray-400" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default LocationInput;
