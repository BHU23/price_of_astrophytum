"use client";

import { useRouter } from "next/navigation";
import BoxPost from "@/components/box_yourpost";
import { useGlobal } from "@/context/useGlobal";
import { useFetchPredictions } from "./api";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";
import Cookies from "js-cookie";
import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import FetchingState from "@/components/fetching_state";
import { useState, useEffect } from "react";
export default function DeashBoard() {
  const router = useRouter();
  const { historyPredictions, loading, error } = useFetchPredictions();

  const { predictionHistoryGlobal, setPredictionHistoryGlobal } =
    useGlobal();

  const classificationCount = historyPredictions?.length;
   const [role, setRole] = useState<string | null>(null);

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
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);
      const newPrediction: PredictionHistorysInterface = {
        image: prediction.image,
        class: data.map((item: any) => item.class_name),
        total_min: prediction.total_min,
        total_max: prediction.total_max,
      };
      await setPredictionHistoryGlobal(newPrediction);

      console.log(newPrediction);
      console.log("predictionHistoryGlobal1", predictionHistoryGlobal);
      router.push(`/${role?.toLowerCase()}/use_ai`);
    } catch (error) {
      console.error("Error fetching prediction details:", error);
    }
  };

  // useEffect(() => {
  //   if (predictionHistoryGlobal) {
  //     router.push("/customer/use_ai");
  //   }
  // }, [predictionHistoryGlobal, router]);

  // Handling loading and error states
  if (loading)
    return (
      <FetchingState state="Loading..." />
    );
  if (error)
    return (
      <FetchingState state={ `Error: ${error}`} />
    );
  return (
    <div className="flex pl-5 pr-5 pb-5 w-full flex-col h-full">
      <div className="bg-card w-full flex flex-wrap rounded-lg ">
        <div className="px-5 py-5 w-full md:w-1/2">
          <div className="border-2 border-pear flex-col rounded-md">
            <div className="flex flex-row justify-between p-4">
              <div>Classification</div>

              <div>
                <svg
                  className="h-5 w-5 fill-current text-tan transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center pb-8 text-5xl">
              {classificationCount}
            </div>
          </div>
        </div>
        <div className="px-5 py-5 w-full md:w-1/2 ">
          <div className="border-2 border-pear flex-col rounded-lg">
            <div className="flex flex-row justify-between p-4">
              <div>Posts</div>
              <div>
                <a
                  className=" text-tan transition-colors duration-300 "
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex justify-center pb-8 text-5xl">4</div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full bg-card mt-5 rounded-md">
        <div className="pt-5 pl-5">Your Image Predict</div>
        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
        {classificationCount !== 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 m-5">
            {historyPredictions?.map((prediction, index) => (
              <BoxPost
                key={index}
                img={prediction.image}
                onClick={() => handleGetPrediction(prediction)}
              />
            ))}
          </div>
        ) : (
          <div className="flex text-cta-gray w-full p-5 pt-0">
            Prediction Now{" "}
            <a
              href={`/${role?.toLowerCase()}/use_ai`}
              className="ml-1 text-pear hover:text-tan hover:underline"
            >
              click
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
