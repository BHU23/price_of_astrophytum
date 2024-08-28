"use client";

import { useState, useRef, useEffect } from "react";

import { useGlobal } from "@/context/useGoble";

export default function useUploadImage() {
  //  const { predictions,setPredictions, predictionHistoryGlobal, setPredictionHistoryGlobal } =
  //    useGlobal();
    // const [predictionHistory, setPredictionHistory] =
    //   useState<PredictionHistorysInterface | null>(predictionHistoryGlobal);
   
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
   

   

  //  useEffect(() => {
  //    if (predictions) {
  //      handleUpload(predictions);
  //    }
  //  }, [predictions]);

    return {
      uploadImageItem: {
        // predictions,
        // loading,
        // setLoading,
      },
    };
}
