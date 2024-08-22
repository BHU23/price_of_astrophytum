"use client";

import { useEffect, useState } from "react";
import BoxType from "@/components/box_type";
import Line from "@/components/line";
import TitleTopic from "@/components/notuse/title_topic";
import TotalPrice from "@/components/total_price";
import { useGlobal } from "@/context/useGoble";
import { MdInfoOutline } from "react-icons/md";
interface ClassesInterface {
  id: number;
  name: string;
  example_image: string;
  extra_value: number;
  description: string;
  price_max: number;
  price_min: number;
}

interface PredictionHistorysInterface {
  image: string;
  class: ClassesInterface[];
  total_min: number;
  total_max: number;
}

interface ResultClassificationProp {}

export default function ResultClassification({}: ResultClassificationProp) {
  const { predictions } = useGlobal();
 
  const [loading, setLoading] = useState(false);
  const newPrediction: PredictionHistorysInterface = {
    image: predictions || "",
    class: [
      {
        id: 1,
        name: "Example Class",
        example_image: predictions,
        extra_value: 0, 
        description: "Example Description",
        price_max: 20000,
        price_min: 1000,
      },
    ],
    total_min: 1000,
    total_max: 20000,
  };
  const [predictionHistory, setPredictionHistory] =
  useState<PredictionHistorysInterface | null>(newPrediction);

  const handleUpload = async (image: string) => {
    if (!image) return;

    try {
      setLoading(true);
      const apiUrl = "http://127.0.0.1:8000/api/history-predictions/";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: image }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
          price_max: cls.price_max,
          price_min: cls.price_min,
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
  return (
    <div className="w-full flex flex-col justify-start h-[100%] gap-5">
      <span className="text-cta-text font-semibold text-sm">
        Result of prediction image
      </span>
      <div className="flex flex-col h-full gap-5">
        {loading && (
          <div className="transition-all text-center text-cta-gray">
            Loading...
          </div>
        )}
        {!loading && predictionHistory && (
          <>
            <TitleTopic name="Types" />
            <Line />
            <div className="flex flex-col h-auto lg:h-min-80 gap-5 justify-start">
              {predictionHistory?.class.map(
                ({ name,example_image,description, price_max, price_min }, index) => (
                  <BoxType
                    key={index}
                    image={predictions}
                    description={description}
                    typeName={name ?? ""}
                    price_min={price_min}
                    price_max={price_max}
                  />
                )
              )}
            </div>
            <Line />
            <div className="flex-none h-[10%] ">
              <TotalPrice
                total="800"
                price_min={predictionHistory.total_min}
                price_max={predictionHistory.total_max}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
