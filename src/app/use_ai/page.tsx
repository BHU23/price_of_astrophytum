"use client";

import { useEffect, useState } from "react";
import BoxType from "@/components/box_type";
import Line from "@/components/line";
import TitlePage from "@/components/title_page";
import TitleTopic from "@/components/title_topic";
import TotalPrice from "@/components/total_price";
import UploadImages from "@/components/upload_images";
import { useGlobal } from "@/context/useGoble";

export default function UseAI() {

  const { predictions } = useGlobal();
  const [imagePreviewdisplay, setImagePreviewdisplay] = useState<string | null>(
    null
  );
  const [images, setImages] = useState<string[]>([predictions]);

  const handleImagePreviewDisplay = (imagePreview: string) => {
    setImagePreviewdisplay(imagePreview);
  };

  const handleFileChange = (previewUrl: string) => {
    setImages((prev) => [previewUrl, ...prev]);
  };

  const handleDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (images.length > 0) {
      if (!imagePreviewdisplay || !images.includes(imagePreviewdisplay)) {
        setImagePreviewdisplay(images[0]);
      }
    } else {
      setImagePreviewdisplay("");
    }
  }, [images, imagePreviewdisplay]);

  return (
    <div className="w-full h-auto lg:h-screen">
      <div className="flex justify-center items-center">
        <TitlePage name="Classification Type" />
      </div>
      <Line />
      <div className="flex flex-row gap-4 items-center justify-start my-8">
        <UploadImages
          onsetImagePreviewdisplay={handleImagePreviewDisplay}
          onsetImages={handleFileChange}
          handleDelete={handleDelete}
          imagePreviews={images}
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-center md:flex-wrap my-4 gap-4 lg:gap-8">
        <div className="w-full lg:w-[46%]">
          {imagePreviewdisplay ? (
            <div className="flex items-center justify-center w-full h-72 sm:h-96 md:h-[500px] bg-gray-200 border-2 border-gray-300 rounded-lg">
              <img
                src={imagePreviewdisplay}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleFileChange(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          )}
        </div>
        <div className="w-full lg:w-[46%] flex flex-col justify-start h-[100%]">
          <div className="flex flex-col h-full">
            <div className="flex-none h-[10%]">
              <TitleTopic name="Types" />
              <Line />
            </div>
            <div className="flex flex-col h-auto lg:h-min-80 py-4 justify-start">
              <BoxType key="normal" typeName="normal" price={100} />
              <BoxType key="rensri" typeName="rensri" price={100} />
              <BoxType key="starshape" typeName="starshape" price={100} />
              <BoxType key="v_type" typeName="v_type" price={200} />
            </div>
            <div className="flex-none h-[10%]">
              <Line />
              <TotalPrice total="800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
