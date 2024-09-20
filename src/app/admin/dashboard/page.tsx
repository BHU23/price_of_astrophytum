"use client";

import { useRouter } from "next/navigation";
import BoxPost from "@/components/box_yourpost";
import { useGlobal } from "@/context/useGlobal";
import { useFetchPredictions } from "./api";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";
import Cookies from "js-cookie";
import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import FetchingState from "@/components/fetching_state";
import { useState, useEffect, useMemo } from "react";
import { parseISO, isWithinInterval } from "date-fns";
import DateRangePicker from "@/components/DateRangePicker";
import StatBox from "@/components/stat_box";
import StatBoxPost from "@/components/stat_boxPost";
import DropdownSort from "@/components/dropdown_sortOrder";
import BarChart from "@/components/bar_chat";
import { DropdownDay } from "@/components/dropdown_setdate";
import { DropdownMonth } from "@/components/dropdown_setmouth";
import { DropdownYear } from "@/components/dropdown_setyeas";
import StatBoxPrice from "@/components/stat_boxPrice";

export default function DeashBoard() {
  const router = useRouter();
  const { historyPredictions, loading, error } = useFetchPredictions();
  const { setPredictionHistoryGlobal } = useGlobal();

  const classificationCount = historyPredictions?.length;
  const [role, setRole] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  const now = new Date();
  const [day, setDay] = useState<number | null>(now.getDate());
  const [month, setMonth] = useState<number | null>(
    (now.getMonth() + 1)
  );
  const [year, setYear] = useState<number | null>(now.getFullYear());

  const filteredOnDayMonthYear = useMemo(() => {
    return historyPredictions?.filter((prediction) => {
      const predictionDate = parseISO(prediction.timestamp);

      const matchesYear = year ? predictionDate.getFullYear() === year : true;
      const matchesMonth = month
        ? predictionDate.getMonth() + 1 === (month)
        : true;
      const matchesDay = day ? predictionDate.getDate() === day : true;

      // Check if it matches the year, month, and day
      return matchesYear && matchesMonth && matchesDay;
    });
  }, [day, month, year, historyPredictions]);

  const countOnDayMonthYear = filteredOnDayMonthYear?.length;
  const priceRangeOnDayMonthYear = filteredOnDayMonthYear?.reduce(
    (acc, prediction) => {
      const min = prediction.total_min || 0;
      const max = prediction.total_max || 0;
      return {
        min: acc.min + min,
        max: acc.max + max,
      };
    },
    { min: 0, max: 0 }
  );

  const formattedPriceRange =
    priceRangeOnDayMonthYear && countOnDayMonthYear
      ? `${(
          priceRangeOnDayMonthYear.min / (countOnDayMonthYear ?? 1)
        ).toLocaleString("en-US", { maximumFractionDigits: 2 })} - ${(
          priceRangeOnDayMonthYear.max / (countOnDayMonthYear ?? 1)
        ).toLocaleString("en-US", { maximumFractionDigits: 2 })}`
      : "No data";

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
      setDateRange({ from: undefined, to: undefined });
    } else {
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

  if (loading) return <FetchingState state="Loading..." />;
  if (error) return <FetchingState state={`Error: ${error}`} />;
  return (
    <div className="flex  w-full flex-col h-full">
      <div className="h-auto w-full bg-card rounded-md shadow-lg mb-5">
        <div className="flex flex-col  md:flex-row justify-between items-center p-5 gap-4 ">
          <div className="font-semibold text-lg w-full md:w-40">
            Admin Dashboard
          </div>
          <div className=" w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <DropdownYear year={year} setYear={setYear} />{" "}
            <DropdownMonth month={month} setMonth={setMonth} />
            <DropdownDay day={day} setDay={setDay} />
            <div
              inline-datepicker
              datepicker-buttons
              datepicker-autoselect-today
              className="mx-auto sm:mx-0"
            ></div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-col1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        <StatBox
          name={"Total Classifications"}
          count={countOnDayMonthYear ?? 0}
        ></StatBox>
        <StatBoxPrice
          name={"Average Price ฿"}
          count={formattedPriceRange ?? ""}
        ></StatBoxPrice>
        <StatBoxPost
          name={"Total Posts"}
          count={classificationCount ?? 0}
        ></StatBoxPost>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-5 gap-4 w-[99.9%] ">
        <BarChart
          series={"count"}
          title="Historys Graph"
          subtitle={`Counts Classification of use AI data for ${
            day ? day + "-" : "day-"
          }${month ? month : "month"}${year ? "-" + year: "-year"}`}
          config={{ colors: ["#C6ED46"] }}
          filteredOnDayMonthYear={filteredOnDayMonthYear}
          year={year}
          month={month}
          day={day}
        />
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
            <DropdownSort
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            ></DropdownSort>
          </div>
        </div>
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
