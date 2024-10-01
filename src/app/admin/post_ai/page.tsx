"use client";
import ResultPost from "@/components/prompt/result_prompt";
import SettingPrompt from "@/components/prompt/upload_image";
import { useGlobal } from "@/context/useGlobal";
export default function PostsAI() {
  const { predictionHistoryGlobal, setPredictionHistoryGlobal } = useGlobal();
  console.log("predictionHistoryGlobal2", predictionHistoryGlobal);
  return (
      <div className=" flex flex-wrap lg:flex-nowrap w-full h-full  gap-5 ">
        <SettingPrompt />
        <div className="w-full h-auto p-5 bg-card rounded-lg shadow-lg  lg:min-h-[calc(100vh-6rem)]">
          <ResultPost />
        </div>
      </div>

  );
}
