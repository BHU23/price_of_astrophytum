import React from "react";
import { FiRotateCcw } from "react-icons/fi";

interface ButtonUploadProp {
  name: string;
  setImage: (img: string) => void;
}

export default function ButtonReload({ name, setImage }: ButtonUploadProp) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
    }
  };

  return (
    <label
      htmlFor="dropzone-file"
      className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer flex items-center"
    >
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <FiRotateCcw />
      &nbsp;{name}
    </label>
  );
}
