"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGoble";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";

export default function useUploadImage() {
   const { predictions } = useGlobal();

   const [loading, setLoading] = useState(false);
   // const newPrediction: PredictionHistorysInterface = {
   //   image: predictions || "",
   //   class: [
   //     {
   //       id: 1,
   //       name: "Example Class",
   //       example_image: predictions,
   //       extra_value: 0,
   //       description: "Example Description",
   //       price: {
   //         id: 1,
   //         value_min: 1000,
   //         value_max: 20000,
   //       },
   //     },
   //   ],
   //   total_min: 1000,
   //   total_max: 20000,
   // };
   const [predictionHistory, setPredictionHistory] =
     useState<PredictionHistorysInterface  | null>();

   const handleUpload = async (image: string) => {
     if (!image) return;

     try {
       const token = localStorage.getItem("token");
       console.log("Token:", token); // Ensure the token is not null or undefined

       setLoading(true);
       const apiUrl = "http://127.0.0.1:8000/api/history-predictions/";

       const response = await fetch(apiUrl, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Token ${token}`,
         },
         body: JSON.stringify({ image: image }),
       });

       console.log(response);

       const data = await response.json();
       console.log("data:", data);

       const newPrediction: PredictionHistorysInterface = {
         image: image,
         class: data.classes.map((cls: any) => ({
           id: cls.id,
           name: cls.name,
           example_image: cls.example_image,
           extra_value: cls.extra_value,
           description: cls.description,
           price: {
             id: 1,
             value_min: cls.price.value_min,
             value_max: cls.price.value_max,
           },
         })),
         total_min: data.total_min,
         total_max: data.total_max,
       };

       setPredictionHistory(newPrediction);
       setLoading(false);
     } catch (error) {
       console.error("Error uploading image:", error);
       setLoading(false);
     }
   };

   useEffect(() => {
     if (predictions) {
       handleUpload(predictions);
     }
   }, [predictions]);
   console.log(predictionHistory);

    return {
      uploadImageItem: {
        predictions,
        loading,
        setLoading,
        predictionHistory,
        setPredictionHistory,
        handleUpload,
      },
    };
}
