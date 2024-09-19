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

export default function DeashBoard() {
  const router = useRouter();
  const { historyPredictions, loading, error } = useFetchPredictions();
  const { predictionHistoryGlobal, setPredictionHistoryGlobal } = useGlobal();

  const classificationCount = historyPredictions?.length;
  const [role, setRole] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const countOnday = useMemo(() => {
    const now = new Date(); // Current date and time
    return historyPredictions?.filter((prediction) => {
      const predictionDate = parseISO(prediction.timestamp);
      return isWithinInterval(predictionDate, {
        start: now,
        end: now,
      });
    }).length;
  }, [dateRange, historyPredictions]);

  const filteredAndSortedPredictions = useMemo(() => {
    return historyPredictions
      ?.filter((prediction) => {
        if (!dateRange.from || !dateRange.to) return true;
        const predictionDate = parseISO(prediction.timestamp);
         const startDate = new Date(dateRange.from);
         startDate.setDate(startDate.getDate() - 1);
        return isWithinInterval(predictionDate, {
          start: startDate,
          end: dateRange.to,
        });
      })
      .sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
      });
  }, [sortOrder, dateRange, historyPredictions]);

  const handleDateRangeChange = (from: any, to: any) => {
    if (!from || !to) {
      // If either 'from' or 'to' is null or undefined, reset the date range
      setDateRange({ from: undefined, to: undefined });
    } else {
      // Otherwise, set the selected date range
      setDateRange({ from, to });
    }
  };


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
      const newPrediction: PredictionHistorysInterface = {
        image: prediction.image,
        class: data.map((item: any) => item.class_name),
        total_min: prediction.total_min,
        total_max: prediction.total_max,
      };
      await setPredictionHistoryGlobal(newPrediction);
      router.push(`/admin/use_ai`);
    } catch (error) {
      console.error("Error fetching prediction details:", error);
    }
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (loading) return <FetchingState state="Loading..." />;
  if (error) return <FetchingState state={`Error: ${error}`} />;
  return (
    <div className="flex pb-5 w-full flex-col h-full">
      <div className="w-full grid grid-cols-2 gap-5 ">
        <StatBox
          name={"Daliy Classification"}
          count={countOnday ?? 0}
        ></StatBox>
        <StatBox
          name={"Alls Classification"}
          count={classificationCount ?? 0}
        ></StatBox>
        <StatBoxPost name={"Daliy Post"} count={countOnday ?? 0}></StatBoxPost>
        <StatBoxPost
          name={"Alls Posts"}
          count={classificationCount ?? 0}
        ></StatBoxPost>
      </div>
      <div className="h-auto w-full bg-card mt-5 rounded-md shadow-lg">
        <div className="flex flex-col  md:flex-row justify-between items-center p-5 pb-0 gap-4">
          <div className="font-semibold w-full md:w-40">Prediction History</div>
          <div className=" w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <DateRangePicker onDateRangeChange={handleDateRangeChange} />
            <div
              inline-datepicker
              datepicker-buttons
              datepicker-autoselect-today
              className="mx-auto sm:mx-0"
            ></div>
            {/* Dropdown Sort Order */}
            <div className="sm:col-span-full relative " ref={dropdownRef}>
              <label
                className="text-cta-text text-sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div
                  id="dropdownActionButton"
                  className={`min-w-40 inline-flex items-center gap-5 justify-between bg-gray-50 border h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-background dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                    isDropdownOpen ? "ring-1 ring-pear" : ""
                  }`}
                >
                  <span className="sr-only">Sort order</span>
                  {sortOrder === "latest" ? "Latest First" : "Oldest First"}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l4 4 4-4"
                    />
                  </svg>
                </div>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div
                    id="dropdownAction"
                    className="z-10 bg-background border border-border divide-y divide-gray-100 rounded-md shadow w-full mt-1 absolute overflow-hidden p-1"
                  >
                    <ul className="text-sm">
                      <li>
                        <div
                          onClick={() => {
                            setSortOrder("latest");
                            setIsDropdownOpen(false); // Close the dropdown
                          }}
                          className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                            sortOrder === "latest"
                              ? "bg-card text-cta-text"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          Latest First
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            setSortOrder("oldest");
                            setIsDropdownOpen(false); // Close the dropdown
                          }}
                          className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                            sortOrder === "oldest"
                              ? "bg-card text-cta-text"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          Oldest First
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
        {/* <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" /> */}

        {classificationCount !== 0 ? (
          <div className="grid grid-flow-row auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-5">
            {filteredAndSortedPredictions?.map((prediction, index) => (
              <BoxPost
                key={index}
                prediction={prediction}
                onClick={() => handleGetPrediction(prediction)}
              />
            ))}
            <div className="flex text-cta-gray w-full ">
              {filteredAndSortedPredictions?.length
                ? ""
                : 'Not have "Classification".'}
            </div>
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
