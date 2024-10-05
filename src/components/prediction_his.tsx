import { useState, useMemo, useRef } from "react";
import { parseISO, isWithinInterval } from "date-fns";
import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import DateRangePicker from "./DateRangePicker";
import DropdownSort from "./dropdown_sortOrder";
import BoxPost from "./box_yourpost";
import { useRouter } from "next/navigation";
import { DeleteHistoryPredictionByID } from "@/app/admin/dashboard/api";
interface PredictionHistoryProp {
  historyPredictions: HistoryPredicstionInterface[] | null;
  role: string | null;
  classificationCount: number | undefined;
  handleGetPrediction: (prediction: HistoryPredicstionInterface) => void;
}

export default function PredictionHistory({
  historyPredictions,
  role,
  classificationCount,
  handleGetPrediction,
}: PredictionHistoryProp) {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const filteredAndSortedPredictions = useMemo(() => {
    return historyPredictions
      ?.filter((prediction) => {
        if (!dateRange.from || !dateRange.to) return true;
        const predictionDate = parseISO(prediction.timestamp);
        const startDate = new Date(dateRange.from);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dateRange.to);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);
        return isWithinInterval(predictionDate, {
          start: startDate,
          end: endDate,
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
  const [predictHisToDelete, setPredictHisToDelete] = useState<number | null>(
    null
  );
  const handleDeleteClick = (hisspreID: number | null) => {
      if (hisspreID) {
        setPredictHisToDelete(hisspreID);
    }
    const modal = document.getElementById("deleteModal");
    if (modal) modal.classList.remove("hidden");
  };

  const handleDeleteConfirm = async () => {
    console.log("Class deleted handleDeleteConfirm", predictHisToDelete);
    if (predictHisToDelete !== null) {
      console.log("Class deleted predictHisToDelete ! null");
      const success = await DeleteHistoryPredictionByID(
        String(predictHisToDelete)
      );
      if (success) {
        console.log("Class deleted successfully");
        router.refresh();
      } else {
        console.error("Failed to delete the class");
      }
      setPredictHisToDelete(null);
      const modal = document.getElementById("deleteModal");
      if (modal) modal.classList.add("hidden");
      window.location.reload();
    }
  };
  return (
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
          <DropdownSort
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          ></DropdownSort>
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
              handleDeleteClick={(id) => {
                handleDeleteClick(id);
              }}
              handleDeleteConfirm={handleDeleteConfirm}
              setPredictHisToDelete={(id) => {
                handleDeleteClick(id);
              }}
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
  );
}
