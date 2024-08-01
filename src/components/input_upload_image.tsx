"use client";

import { useState } from "react";
import ButtonUpload from "./button_upload";
import ButtonReload from "./button_reload";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGoble";

interface InputUploadImageProps {
  nameButton: string;
}

export default function InputUploadImage({
  nameButton,
}: InputUploadImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { setPredictions } = useGlobal(); // Use the global context
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!imagePreview) return;

    try {
      // const response = await fetch("/api/Getpriceapi", {
      //   method: "POST",
      //   body: JSON.stringify({ image: imagePreview }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await response.json();

      // setPredictions(data.predictions);
      console.error("imagePreview", imagePreview);
      setPredictions(imagePreview);

      router.push("/use_ai");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      {!imagePreview && (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
      {imagePreview && (
        // <img
        //   src={imagePreview}
        //   alt="Preview"
        //   className="w-full h-96 mt-4 border-2 border-gray-300 rounded-lg object-cover"
        // />
        <div className="flex items-center justify-center w-full h-72 sm:h-96 md:h-96 border-gray-300 cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 rounded-lg">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
      <div className="flex flex-row gap-4 items-center justify-center w-full">
        <ButtonUpload name={nameButton} onClick={handleUpload} />
        <ButtonReload name={"Reload"} setImage={setImagePreview} />
      </div>
    </div>
  );
}
