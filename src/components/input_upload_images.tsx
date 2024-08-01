"use client";

import { FiPlus } from "react-icons/fi";

interface InputUploadImagesProps {
  onFileChange: (previewUrl: string) => void;
}

export default function InputUploadImages({
  onFileChange,
}: InputUploadImagesProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onFileChange(previewUrl);
    }
  };

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-16 h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FiPlus style={{ width: "40px", height: "40px" }} />
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
