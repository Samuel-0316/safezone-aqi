"use client";

import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const BackgroundImg = ({
  children,
}: Readonly<{ children?: React.ReactNode }>) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";

  if (!mounted) {
    return (
      <div className="relative h-screen w-full bg-gray-900 p-4 sm:p-6 md:p-8">
        {children}
      </div>
    );
  }

  const bgImage = isDarkMode
    ? "/plague-doc-green.png"
    : "/plague-doc-white.png";

  return (
    <div className="relative h-screen w-full p-4 sm:p-6 md:p-8">
      <Image
        src={bgImage}
        alt="Background"
        fill
        priority
        className="object-cover object-center md:object-[center_top]"
        quality={100}
      />

      <div className="relative z-10 text-sm text-gray-100 sm:text-base md:text-lg">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImg;
