import React from "react";
import { FiRotateCcw } from "react-icons/fi";

interface ButtonUploadProp {
  name: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ButtonReload({ name, handleFileChange }: ButtonUploadProp) {
  return (
    <input
      className="block w-full h-10 pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer file:p-2 file:font-semibold file:h-full file:rounded-md file:border-0 file:bg-gray-800 file:text-pear file:text-sm file:mr-2 dark:hover:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
      id="small_size"
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    ></input>
  );
}
