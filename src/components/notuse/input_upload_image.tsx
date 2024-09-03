"use client";

import { useState, useRef, useEffect } from "react";
import ButtonUpload from "../button_items";
import ButtonReload from "../use_ai/button_reload";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGlobal";
import { FiCamera, FiCrosshair, FiX, FiXCircle } from "react-icons/fi";

interface InputUploadImageProps {
  nameButton: string;
}

export default function InputUploadImage({
  nameButton,
}: InputUploadImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<boolean>(false);
  const { setPredictions } = useGlobal();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          console.log("reader.result" + reader.result);
          setImagePreview(reader.result); // This will be the Base64 string
          setVideoStatus(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imagePreview) return;

    try {
      setPredictions(imagePreview);
      router.push("/use_ai");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const openCamera = async () => {
    setVideoStatus(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setVideoStatus(false);
  };
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const video = videoRef.current;
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;
        context.drawImage(
          video,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataUrl = canvasRef.current.toDataURL("image/png");
        console.log(dataUrl);
        setImagePreview(dataUrl);
        setVideoStatus(false);
      }
    }
    closeCamera();
  };

  useEffect(() => {
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      {videoStatus ? (
        <div className="relative flex items-center justify-center w-full h-72 sm:h-96 md:h-auto border-2 border-gray-300 cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 rounded-lg">
          <video ref={videoRef} className="w-full h-full" autoPlay muted />
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={closeCamera}
            className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
          >
            <FiXCircle />
          </button>
          <button
            type="button"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
            onClick={captureImage}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Capture Image"
          >
            <FiCamera className="w-6 h-6 text-gray-500 dark:text-gray-300" />
            <span className="sr-only">Capture image</span>
          </button>
          {isTooltipVisible && (
            <div
              role="tooltip"
              className="absolute z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
              style={{
                bottom: "20%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Take a photo
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          )}
        </div>
      ) : !imagePreview && !videoStatus ? (
        <div className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-72 sm:h-96 md:h-96 border-2 border-gray-300 cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 rounded-lg">
          <Image
            width={500}
            height={500}
            src={imagePreview ?? ""}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      <div className="flex flex-row gap-4 items-center justify-center w-full">
        <ButtonUpload name={nameButton} onClick={handleUpload} />
        {/* <ButtonReload name={"Reload"} setImage={setImagePreview} /> */}
        <button
          onClick={openCamera}
          className="flex items-center justify-center py-3 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
        >
          <FiCamera />
        </button>
      </div>
    </div>
  );
}
