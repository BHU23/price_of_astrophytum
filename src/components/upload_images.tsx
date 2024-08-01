"use client";

import InputUploadImages from "./input_upload_images";
import HistoryUploadImages from "./history_upload_image";

interface UploadImagesProps {
  onsetImagePreviewdisplay: (imagePreview: string) => void;
  onsetImages: (imagePreviews: string) => void;
  handleDelete: (index: number) => void;
  imagePreviews: string[];
}

export default function UploadImages({
  onsetImages,
  onsetImagePreviewdisplay,
  handleDelete,
  imagePreviews,
}: UploadImagesProps) {
  const handleFileChange = (previewUrl: string) => {
    onsetImages(previewUrl);
    onsetImagePreviewdisplay(previewUrl);
  };

  return (
    <div className="flex flex-row gap-4 items-center flex-wrap">
      <InputUploadImages onFileChange={handleFileChange} />
      {/* <div className="flex flex-row gap-4 flex-wrap"> */}
        {imagePreviews.map((imagePreview, index) => (
          <HistoryUploadImages
            key={index}
            imagePreview={imagePreview}
            onDelete={handleDelete}
            index={index}
            onClick={() => onsetImagePreviewdisplay(imagePreview)}
          />
        ))}
      {/* </div> */}
    </div>
  );
}
