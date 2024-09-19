import React, { useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";

interface ButtonUploadProp {
  name: string;
  isShow: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ButtonReload({
  name,
  isShow,
  handleFileChange,
}: ButtonUploadProp) {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);

    const selectedFile = event.target.files?.[0]; // Store selected file
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus("Uploading...");
      setProgress(0);

      // Simulating upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 10; // Simulate progress increment
          } else {
            clearInterval(interval);
            setUploadStatus("Upload successful!");
            return prev; // Stop incrementing at 100
          }
        });
      }, 200);

      // Simulate a possible error
      setTimeout(() => {
        if (Math.random() > 0.8) {
          clearInterval(interval);
          setUploadStatus("Upload failed.");
          setProgress(0);
        }
      }, 10000); // Simulate upload duration
    }
  };

  return (
    <div className="relative">
      <input
        className="hidden"
        id="dropzone-file"
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      <button
        className={`gap-2 items-center p-2 w-full h-20 text-sm text-cta-gray border-2 border-border rounded-lg cursor-pointer transition-colors hover:bg-gray-100 hover:text-tan dark:hover:text-cta-text focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-500 dark:bg-transparent dark:border-gray-500 dark:hover:bg-border ${
          isShow ? "border-red-500" : ""
        }`}
      >
        <label
          htmlFor="dropzone-file"
          className="flex justify-between w-full h-full"
        >
          <div className="flex items-start gap-2 max-w-9/10 overflow-hidden">
            <span className="flex text-5xl h-full w-10 items-center">
              <FaRegFileImage />
            </span>{" "}
            <div className="flex flex-col items-start justify-center h-full gap-2">
              <span className={`truncate max-w-[200px] block`}>
                {uploadStatus ? file?.name : "Upload Image"}
              </span>

              {/* Conditionally render progress bar and file size */}
              {uploadStatus === "Uploading..." ? (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${progress}%`, transition: "width 0.2s" }}
                  />
                </div>
              ) : (
                file && (
                  <p className="text-sm">
                    {((file?.size ?? 0) / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )
              )}
            </div>
          </div>
          {uploadStatus?.includes("successful") && (
            <div className="w-1/10 text-xl flex justify-center items-center">
              {uploadStatus?.includes("failed") ? <FaXmark /> : <FcCheckmark />}
            </div>
          )}
        </label>
      </button>

      {isShow && (
        <p className="mt-2 text-sm text-red-400">
          Opp! Please enter {"Nudum image"}, this field is required.
        </p>
      )}
    </div>
  );
}
