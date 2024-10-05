"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGlobal";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";
import Cookies from "js-cookie";
export default function useFormUploadImage() {
  const router = useRouter();
  const {
    predictionHistoryGlobal,
    setPredictionHistoryGlobal,
    setLoading,
    loading,
  } = useGlobal();
  console.log("predictionHistoryGlobalUp", predictionHistoryGlobal);
  const [imagePreview, setImagePreview] = useState<string | null>(
    predictionHistoryGlobal.image || null
  );
  const [imagePreviewOld, setImagePreviewOld] = useState<string | null>(
    predictionHistoryGlobal.image || null
  );

  const [videoStatus, setVideoStatus] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isShow, setIsShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          console.log("reader.result: " + reader.result);
          setImagePreview(reader.result);
          setVideoStatus(false);
          setIsShow(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const fetchedRole = Cookies.get("role");
    if (fetchedRole) {
      setRole(fetchedRole);
    } else {
      console.warn("Role not found in cookies");
    }
  }, []);
  const handleUpload = async () => {
    console.log("handleCheckInput");

    if (!imagePreview) {
      setIsShow(true);
      setErrorMessage("Opp! Please enter Nudum image, this field is required.");

      return;
    } else {
      setIsShow(false);
      setErrorMessage("");
    }

    if (loading || imagePreview === imagePreviewOld) return;

    try {
      const token = Cookies.get("token");
      console.log("Token:", token);

      setLoading(true);
      const apiUrl = "http://127.0.0.1:8000/api/history-predictions/";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: imagePreview }),
      });

      // Check if response is not OK
      if (!response.ok) {
        const data = await response.json();
        console.error("Error response data:", data);
        setPredictionHistoryGlobal((prev: PredictionHistorysInterface) => ({
          ...prev,
          prompt: "",
          result: "",
          classes: [],
          image: "",
          price: 0,
          user_profile: null,
          history_predictions: null,
          role: null,
          style: null,
        }));
        throw new Error(data.status || "Failed to upload image");
      }

      const data = await response.json();
      console.log("data:", data);

      const newPrediction = {
        image: imagePreview,
        id: data.id,
        class: data.classes.map((cls: any) => ({
          id: cls.id,
          name: cls.name,
          example_image: cls.example_image,
          extra_value: cls.extra_value,
          description: cls.description,
          price: {
            id: cls.price.id ?? 1,
            value_min: cls.price.value_min,
            value_max: cls.price.value_max,
          },
        })),
        total_min: data.total_min,
        total_max: data.total_max,
      };

      // Adjust total_min and total_max based on class types
      const hasVtypeHigh = newPrediction.class.some(
        (cls: any) => cls.name === "Vtype-High"
      );
      const hasVtypeLow = newPrediction.class.some(
        (cls: any) => cls.name === "Vtype-Low"
      );

      if (hasVtypeHigh && hasVtypeLow) {
        newPrediction.total_min /= 2;
        newPrediction.total_max /= 2;
      }

      setImagePreviewOld(imagePreview);
      setPredictionHistoryGlobal(newPrediction);

      // ตรวจสอบ role และกำหนดเส้นทางที่ถูกต้อง
      let newPath;
      if (role === "User") {
        newPath = `/user/use_ai/${newPrediction.id}`;
      } else if (role === "Admin") {
        newPath = `/admin/use_ai/${newPrediction.id}`;
      } else {
        newPath = `/login`;
      }

      router.replace(newPath);
    } catch (error) {
      // Check if the error is an instance of Error
      console.error("Error uploading image:", error);
      setIsShow(true);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false); // Ensure loading state is reset
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

  useEffect(() => {
    setImagePreview(predictionHistoryGlobal.image || null);
    setImagePreviewOld(predictionHistoryGlobal.image || null);
  }, [predictionHistoryGlobal]);

  return {
    useFormUploadImageItem: {
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
      isShow,
      loading,
      errorMessage,
    },
  };
}
