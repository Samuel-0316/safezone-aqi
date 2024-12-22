"use client";

import React from "react";
import Link from "next/link";
import LocationInput from "./LocationInput";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 absolute top-0 z-10 w-full px-2 backdrop-blur">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between md:justify-around">
          <div className="mb-2 flex w-full flex-grow justify-start md:mb-0 md:w-auto md:justify-start">
            <Link
              href="/"
              className="text-primary font-bold text-backgroundlight dark:text-green-600"
              style={{
                fontSize: "clamp(1.25rem, 2vw, 2rem)",
              }}
            >
              SafeZone-AQI
            </Link>
          </div>

          <div className="mb-2 mr-2 flex w-full flex-grow justify-center md:mb-0 md:w-auto">
            <LocationInput />
          </div>

          <div className="mb-2 flex flex-grow justify-end md:justify-end">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
