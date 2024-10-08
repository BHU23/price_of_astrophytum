"use client";

import { useRouter } from "next/navigation";
import BoxPost from "@/components/box_yourpost";
import { useGlobal } from "@/context/useGlobal";
import { useFetchPredictions } from "./api";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";
import Cookies from "js-cookie";
import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import FetchingState from "@/components/fetching_state";
import { useState, useEffect, useMemo, useRef } from "react";
import { parseISO, isWithinInterval } from "date-fns";
import DateRangePicker from "@/components/DateRangePicker";
import StatBox from "@/components/stat_box";
import StatBoxPost from "@/components/stat_boxPost";
import DropdownSort from "@/components/dropdown_sortOrder";
import PredictionHistory from "@/components/prediction_his";
import { toast } from "react-toastify";
export default function DeashBoard() {
  const router = useRouter();
  const { historyPredictions,historyPrompts, loading, error } = useFetchPredictions();
  const { predictionHistoryGlobal, setPredictionHistoryGlobal } = useGlobal();

  const classificationCount = historyPredictions?.length;
  const historyPromptsCount = historyPrompts?.length;
  const [role, setRole] = useState<string | null>(null);

  const countOnday = useMemo(() => {
    const now = new Date(); 
    return historyPredictions?.filter((prediction) => {
      const predictionDate = parseISO(prediction.timestamp);
      const startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 1); 
      endDate.setHours(0, 0, 0, 0);
      return isWithinInterval(predictionDate, {
        start: startDate,
        end: endDate,
      });
    }).length;
  }, [historyPredictions]);
  
  const historyPromptOnday = useMemo(() => {
    const now = new Date();
    return historyPrompts?.filter((prediction) => {
      const predictionDate = parseISO(prediction?.timestamp ?? "");
      const startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);
      return isWithinInterval(predictionDate, {
        start: startDate,
        end: endDate,
      });
    }).length;
  }, [historyPrompts]);

  
  useEffect(() => {
    const fetchedRole = Cookies.get("role");
    if (fetchedRole) {
      setRole(fetchedRole);
    } else {
      console.warn("Role not found in cookies");
    }
  }, []);

  const handleGetPrediction = async (
    prediction: HistoryPredicstionInterface
  ) => {
    if (!prediction.id) return;

    const apiUrl = `http://127.0.0.1:8000/predictions/${prediction.id}/`;

    try {
      const token = Cookies.get("token");
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("dddd", data);
      const newPrediction: PredictionHistorysInterface = {
        id: prediction.id,
        image: prediction.image,
        class: data.map((item: any) => item.class_name),
        total_min: prediction.total_min,
        total_max: prediction.total_max,
      };
      await setPredictionHistoryGlobal(newPrediction);
      router.push(`/user/use_ai/${prediction.id}`);
    } catch (error) {
      console.error("Error fetching prediction details:", error);
    }
  };

  if (loading) return <FetchingState state="Loading..." />;
  if (error) return <FetchingState state={`Error: ${error}`} />;

  return (
    <div className="flex w-full flex-col h-full">
      <div className="w-full grid grid-cols-2 gap-5 ">
        <StatBox
          name={"Daliy Classification"}
          count={countOnday ?? 0}
        ></StatBox>
        <StatBox
          name={"Alls Classification"}
          count={classificationCount ?? 0}
        ></StatBox>
        <StatBoxPost
          name={"Daliy Post"}
          count={historyPromptOnday ?? 0}
        ></StatBoxPost>
        <StatBoxPost
          name={"Alls Posts"}
          count={historyPromptsCount ?? 0}
        ></StatBoxPost>
      </div>
      <PredictionHistory
        historyPredictions={historyPredictions}
        role={role}
        classificationCount={classificationCount}
        handleGetPrediction={(h)=>{handleGetPrediction(h)}}
      />
    </div>
  );
}
