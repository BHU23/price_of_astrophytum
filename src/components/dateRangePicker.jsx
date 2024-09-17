"use client";

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";

export default function DateRangePicker({ onDateRangeChange }) {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateSelect = (newRange) => {
    console.log("newRange", newRange);
    setValue(newRange);

    // Handle cases where only one of the dates is selected
    if (newRange?.startDate || newRange?.endDate) {
      onDateRangeChange(newRange.startDate, newRange.endDate);
    } else {
      // Reset both dates when neither is selected
      onDateRangeChange(null, null);
    }
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), "MMM dd, yyyy") : "";
  };

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div className="flex items-center space-x-4">
      <Datepicker
        primaryColor={"lime"} // Set primary color if needed
        value={value}
        onChange={handleDateSelect}
        placeholder="Select Date Range"
        showShortcuts={true}
        inputClassName={`min-w-72 w-full border text-cta-text text-sm rounded-md p-2 focus:ring-pear focus:border-pear bg-background 
        ${
          isDarkMode
            ? " text-white bg-black border-gray-600"
            : "text-gray-900 border-gray-300"
        }`}
        renderInput={({ ref }) => (
          <input
            ref={ref}
            readOnly
            value={
              value.startDate || value.endDate
                ? `${formatDate(value.startDate)} ${
                    value.endDate ? `to ${formatDate(value.endDate)}` : ""
                  }`
                : ""
            }
            placeholder="Select Date Range"
            className={`min-w-72 w-full rounded-lg focus:ring-pear focus:border-pear p-2.5 bg-background ${
              isDarkMode
                ? " text-white bg-black border-gray-600"
                : "bg-gray-50 text-gray-900 border-gray-300"
            }`}
          />
        )}
      />
    </div>
  );
}
