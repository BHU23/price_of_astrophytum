"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useClass() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newPriceState, setnewPriceState] = useState(false);
  const [formDataClass, setFormDataClass] = useState({
    name: "",
    about: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "United States",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
    file: null as File | null,
  });

  
  const router = useRouter();
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          console.log("reader.result: " + reader.result);
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (!imagePreview) return;
    try {
      //  xxxxxxxxxx
      router.push("/customer/use_ai");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return {
    useClassItems: {
      imagePreview,
      handleFileChange,
      handleUpdate,
      setImagePreview,
      newPriceState,
      setnewPriceState,
    },
  };
}
