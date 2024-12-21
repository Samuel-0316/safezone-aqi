import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-10 h-0 w-full bg-transparent">
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/" className="text-2xl font-bold text-green-500">
          SafeZone-AQI
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
