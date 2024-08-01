"use client";

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface HistoryUploadImagesProps {
  imagePreview: string | null;
  onDelete: (index: number) => void;
  onClick: (index: number) => void; // Added onClick function
  index: number;
}

export default function HistoryUploadImages({
  imagePreview,
  onDelete,
  onClick, // Destructure onClick
  index,
}: HistoryUploadImagesProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center w-16 h-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imagePreview ? (
        <>
          <img
            src={imagePreview}
            alt="Preview"
            className="w-16 h-16 border-2 border-gray-300 rounded-lg object-cover"
            onClick={() => onClick(index)} // Trigger onClick when image is clicked
          />
          {isHovered && (
            <button
              onClick={() => onDelete(index)}
              className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
            >
              <FiTrash2 />
            </button>
          )}
        </>
      ) : (
        <p>No preview available</p>
      )}
    </div>
  );
}
