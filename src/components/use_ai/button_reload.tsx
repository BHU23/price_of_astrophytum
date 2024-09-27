import React, { useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";

interface ButtonUploadProp {
  name: string;
  isShow: boolean;
  loading: boolean;
  errMessage: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ButtonReload({
  name,
  isShow,
  errMessage,
  loading,
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

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 75; // Faster progress increment (25%)
          } else {
            clearInterval(interval);
            setUploadStatus("Upload successful!");
            return prev; // Stop incrementing at 100
          }
        });
      }, 100); // Faster interval (100ms)

      // Simulate a possible error
      setTimeout(() => {
        if (Math.random() > 0.9) {
          // Increased probability of failure (10%)
          clearInterval(interval);
          setUploadStatus("Upload failed.");
          setProgress(0);
        }
      }, 200); // Simulate upload duration
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
        disabled={loading}
      />

      <button
        className={`gap-2 items-center p-2 w-full h-20 text-sm text-cta-gray border-2 border-border rounded-lg cursor-pointer transition-colors hover:bg-gray-100 hover:text-tan dark:hover:text-cta-text focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-500 dark:bg-transparent dark:border-gray-500 dark:hover:bg-border ${
          isShow ? "border-red-500" : ""
        }`}
        disabled={loading}
      >
        <label
          htmlFor="dropzone-file"
          className="flex justify-between w-full h-full"
        >
          <div className="flex items-start gap-2 max-w-9/10 w-full overflow-hidden">
            <span className="flex text-5xl h-full w-10 items-center text-gray-400 drak:text-cta-gray">
              <FaRegFileImage />
            </span>{" "}
            <div className="flex flex-col items-start justify-center h-full gap-2 w-[100%]">
              <span
                className={`truncate max-w-[200px] block w-full text-start`}
              >
                {uploadStatus ? file?.name : "Upload Image"}
              </span>

              {/* Conditionally render progress bar and file size */}
              {uploadStatus === "Uploading..." ? (
                <div className="min-w-[200px] w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="h-full w-[200px] rounded-full bg-pear"
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

      {isShow && <p className="mt-2 text-sm text-red-400">{errMessage}</p>}
    </div>
  );
}
