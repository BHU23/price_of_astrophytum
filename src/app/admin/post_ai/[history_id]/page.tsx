"use client";
import ResultPost from "@/components/prompt/result_prompt";
import SettingPrompt from "@/components/prompt/upload_image";
import { useGlobal } from "@/context/useGlobal";
import { useEffect } from "react";
import Cookies from "js-cookie";
import {
  HistoryPredictionsInterface,
  PredictionHistorysInterface,
} from "@/interface/predictionHistorys.interface";
export default function PostsAI({
  params,
}: {
  params: { history_id: string;};
}) {
  const History_id = parseInt(params.history_id, 10);
  const { predictionHistoryGlobal, setPredictionHistoryGlobal } = useGlobal();
  console.log("predictionHistoryGlobal2", predictionHistoryGlobal);
  console.log("History_id", History_id);
  const handleGetPrediction = async () => {
    if (!History_id) return;

    const apiUrl = `http://127.0.0.1:8000/api/history-predictions/${History_id}`;

    try {
      const token = Cookies.get("token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: HistoryPredictionsInterface = await response.json();
      console.log("Fetched data:", data);

      const newPrediction: PredictionHistorysInterface = {
        id: data.id,
        image: data.image,
        class: data.predictions.map((item: any) => item.class_name),
        total_min: data.total_min,
        total_max: data.total_max,
      };

      setPredictionHistoryGlobal(newPrediction);
    } catch (error) {
      console.error("Error fetching prediction details:", error);
    }
  };

  useEffect(() => {
    handleGetPrediction();
  }, [History_id]);
  console.log("predictionHistoryGlobalPostA", predictionHistoryGlobal);
  return (
    <div className=" flex flex-wrap lg:flex-nowrap w-full h-full  gap-5 ">
      <SettingPrompt />
      <div className="w-full h-auto p-5 bg-card rounded-lg shadow-lg  lg:min-h-[calc(100vh-6rem)]">
        <ResultPost />
      </div>
    </div>
  );
}
