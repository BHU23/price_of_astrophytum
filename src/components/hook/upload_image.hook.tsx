"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGoble";


export default function useUploadImage() {
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
          console.log("reader.result: " + reader.result);
          setImagePreview(reader.result); 
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
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

    return {
      uploadImageItem: {
        imagePreview,
        videoStatus,
        videoRef,
        canvasRef,
        isTooltipVisible,
        handleFileChange,
        handleUpload,
        openCamera,
        closeCamera,
        captureImage,
        handleMouseEnter,
        handleMouseLeave,
        setImagePreview,
      },
    };
}
