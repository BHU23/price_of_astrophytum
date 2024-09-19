"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {resolvedTheme === "dark" ? (
        <FiSun
          className="w-full h-full p-1.5"
          onClick={() => setTheme("light")}
        />
      ) : (
        <FiMoon
          className="w-full h-full p-1.5"
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
}
