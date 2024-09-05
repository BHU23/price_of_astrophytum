"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <FiSun className=" w-full h-full p-4" onClick={() => setTheme("light")} />
    );

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
