"use client";
import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function DarkModeDatePicker() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  // Toggle dark mode
  useEffect(() => {
    const rootElement = document.documentElement;

    if (isDarkMode) {
      rootElement.classList.add("dark");
    } else {
      rootElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="p-4">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded"
      >
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      {/* Datepicker */}
      <div className="mt-4">
        <Datepicker
          value={value}
          onChange={handleValueChange}
          // Apply conditional class based on dark mode
          inputClassName={`w-full px-4 py-2 border ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
      </div>
    </div>
  );
}
