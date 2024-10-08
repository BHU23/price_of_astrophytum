"use client";

import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGlobal";
import { DeleteHistoryPredictionByID, useFetchPredictions } from "../dashboard/api";
import Cookies from "js-cookie";
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
import Image from "next/image";
import ActionTable from "@/components/action_table";
import Pagination from "@/components/pagination";
import { format } from "date-fns";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import DeleteModle from "@/components/delete_model";
import { DeleteHistoryPrompt } from "@/service/https/promp";
export default function DeashBoard() {
  const router = useRouter();
   const { historyPredictions, historyPrompts, loading, error } =
     useFetchPredictions();
  const { setPredictionHistoryGlobal } = useGlobal();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const historyPromptsCount = historyPrompts?.length;
  const [role, setRole] = useState<string | null>(null);

  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  const now = new Date();
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(now.getMonth() + 1);
  const [year, setYear] = useState<number | null>(now.getFullYear());

  const hisPromptFilteredOnDayMonthYear = useMemo(() => {
    return historyPrompts?.filter((prediction) => {
      const timestamp = prediction.timestamp;

      // If timestamp is undefined, we skip this prediction
      if (!timestamp) {
        return false;
      }

      const predictionDate = parseISO(timestamp);

      const matchesYear = year ? predictionDate.getFullYear() === year : true;
      const matchesMonth = month
        ? predictionDate.getMonth() + 1 === month
        : true;
      const matchesDay = day ? predictionDate.getDate() === day : true;

      // Check if it matches the year, month, and day
      return matchesYear && matchesMonth && matchesDay;
    });
  }, [day, month, year, historyPrompts]);

  const filteredAndSortedPrompts = useMemo(() => {
    return historyPrompts
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

        if (isNaN(dateA) || isNaN(dateB)) {
          console.warn(`Invalid dates: ${a.timestamp}, ${b.timestamp}`);
          return 0; // Handle invalid dates gracefully
        }

        return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
      });
  }, [sortOrder, dateRange, historyPrompts]);

  const handleDateRangeChange = (from: any, to: any) => {
    setCurrentPage(1);
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

  const [promptHisToDelete, setPromptHisToDelete] = useState<number | null>(
    null
  );

  const [previewPredictHis, setPredictHis] = useState<number[]>([]);

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const getNestedValue = (obj: any, key: string) => {
    return key.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);
  };

  const sortedPrompts = filteredAndSortedPrompts?.sort((a, b) => {
    if (!sortKey) return 0;

    const valueA = getNestedValue(a, sortKey);
    const valueB = getNestedValue(b, sortKey);

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

  const displayedPromptsHis = sortedPrompts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil((sortedPrompts?.length ?? 0) / itemsPerPage);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };
  
  const togglePrediction = (id: number) => {
    setPredictHis((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = (hisspreID: number) => {
    setPromptHisToDelete(hisspreID);
    const modal = document.getElementById("deleteModal");
    if (modal) modal.classList.remove("hidden");
  };
  const handleDeleteConfirm = async () => {
    if (promptHisToDelete !== null) {
      const success = await DeleteHistoryPrompt(String(promptHisToDelete));
      if (success) {
        console.log("HistoryPrompt deleted successfully");
        // Refresh or update the UI after deletion
        router.refresh(); // Refresh the page or trigger re-fetching
      } else {
        console.error("Failed to delete the HistoryPrompt");
      }
      setPromptHisToDelete(null);
      const modal = document.getElementById("deleteModal");
      if (modal) modal.classList.add("hidden");
      window.location.reload();
    }
  };
  const formatDate = (timestamp: Date) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return format(date, "dd-MM-yyyy HH:mm a");
  };
  if (loading) return <FetchingState state="Loading..." />;
  if (error) return <FetchingState state={`Error: ${error}`} />;
  return (
    <div className="flex  w-full flex-col h-full">
      <div className="h-auto w-full bg-card rounded-md shadow-lg mb-5">
        <div className="flex flex-col  md:flex-row justify-between items-center p-5 gap-4 ">
          <div className="font-semibold text-lg w-full md:w-40">
            Postsed History
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

      {/* <div className="w-full grid grid-col1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
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
          count={hisPromptFilteredOnDayMonthYear?.length ?? 0}
        ></StatBoxPost> 
      </div>*/}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-[99.9%] ">
        <BarChart
          series={"count"}
          title="Histories Graph"
          subtitle={`Counts Classification of use AI data for ${
            day ? day + "-" : "day-"
          }${month ? month : "month"}${year ? "-" + year : "-year"}`}
          config={{ colors: ["#C6ED46"] }}
          filteredOnDayMonthYear={hisPromptFilteredOnDayMonthYear}
          year={year}
          month={month}
          day={day}
          count={hisPromptFilteredOnDayMonthYear?.length ?? 0}
        />
      </div>
      <div className="h-auto w-full bg-card mt-5 rounded-md shadow-lg">
        <div className="flex flex-col  md:flex-row justify-between items-center p-5 pb-0 gap-4">
          <div className="font-semibold w-full md:w-40">Posts History</div>
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
        {historyPromptsCount !== 0 ? (
          <div className="p-5">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-cta-text uppercase bg-background">
                <tr>
                  <th
                    scope="col"
                    className="p-4 h-12 w-11"
                    onClick={() => handleSort("id")}
                  >
                    {/* <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div> */}{" "}
                    {sortKey === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="pl-6 py-3 cursor-pointer"
                    onClick={() => handleSort("timestamp")}
                  >
                    {" "}
                    {sortKey === "timestamp" &&
                      (sortDirection === "asc" ? "↑" : "↓")}{" "}
                    Data{" "}
                  </th>
                  <th
                    className="pl-6 py-3 text-end cursor-pointer "
                    onClick={() => handleSort("role")}
                  >
                    {" "}
                    {sortKey === "role" &&
                      (sortDirection === "asc" ? "↑" : "↓")}{" "}
                    Role
                  </th>
                  <th
                    className="pl-6 py-3 cursor-pointer text-end"
                    onClick={() => handleSort("style")}
                  >
                    {sortKey === "style" &&
                      (sortDirection === "asc" ? "↑" : "↓")}{" "}
                    Style
                  </th>
                  <th scope="col" className="px-6 py-3 text-center max-w-8">
                    Action
                  </th>
                </tr>
              </thead>

              {displayedPromptsHis?.map((h, index) => (
                <>
                  <tr
                    key={h.id}
                    className="bg-white border-b dark:bg-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="w-4 p-4">
                      <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => togglePrediction(h.id)}
                      >
                        {previewPredictHis.includes(h.id) ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center">
                        <Image
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                          src={h.image}
                          alt={`${h.id} image`}
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {h?.user_profile?.username}
                          </div>
                          <p className="font-normal text-gray-500 h-auto text-start w-20 md:w-60 truncate">
                            {formatDate(new Date(h.timestamp))}
                          </p>
                        </div>
                      </div>
                    </th>
                    <td className="pl-6 py-4 text-end">{h.role?.name}</td>
                    <td className="pl-6 py-4 text-end">{h.style?.name}</td>
                    <td className="px-6 py-4">
                      {" "}
                      <button
                        type="button"
                        className=" flex flex-row gap-2  text-red-500 w-full px-4 py-2 text-left text-sm justify-center items-center"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-5"
                        onClick={() => handleDeleteClick(h.id)}
                      >
                        <FiTrash /> Delete
                      </button>
                    </td>
                  </tr>
                  {previewPredictHis.includes(h.id) && (
                    <tr>
                      <td
                        colSpan={5}
                        className="bg-gray-100 dark:bg-gray-700 p-4 pl-16"
                      >
                        <div className="text-gray-600 dark:text-gray-300 flex gap-5 flex-wrap">
                          <Image
                            width={40}
                            height={40}
                            className="w-40 h-40 rounded-lg"
                            src={h.image}
                            alt={`${h.id} image`}
                          />
                          <div className="flex gap-4 flex-col">
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Created by username</p>
                              {h?.user_profile?.username ?? "-"}
                            </div>
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Name</p>
                              {h?.user_profile?.first_name ?? "-"}{" "}
                              {h?.user_profile?.last_name}
                            </div>
                          </div>
                          <div className="flex gap-4 flex-col">
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Task</p>
                              {h?.prompt ?? "-"}
                            </div>
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Role</p>
                              {h?.role?.name ?? "-"}
                            </div>
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Style</p>
                              {h?.style?.name ?? "-"}
                            </div>
                          </div>
                          <div className="flex gap-4 flex-col">
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Class</p>
                              {h?.classes ?? "-"}
                            </div>
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Price</p>
                              {h?.price ?? "-"}
                            </div>
                          </div>
                          <div className="flex gap-4 flex-col">
                            <div
                              className="flex gap-1 flex-col"
                              style={{ whiteSpace: "pre-wrap" }}
                            >
                              <p className="font-medium text-cta-text">
                                Result
                              </p>
                              {h?.result ?? "-"}
                            </div>
                          </div>
                          {/* <div className="flex gap-4 flex-col">
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Classes </p>
                              <div className="flex items-center gap-2">
                                {h?.history_predictions?.predictions?.length &&
                                  h?.history_predictions?.predictions?.map(
                                    (p, idx) => (
                                      <div key={idx}>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                          {p?.class_name.name ?? "-"}
                                        </p>
                                      </div>
                                    )
                                  )}
                              </div>
                            </div>
                            <div className="flex gap-1 flex-col">
                              <p className="font-medium">Total Price</p>
                              {h?.history_predictions?.total_min.toLocaleString()}{" "}
                              -{" "}
                              {h?.history_predictions?.total_max.toLocaleString()}{" "}
                              Bath.
                            </div>
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </table>

            <Pagination
              itemsPerPage={itemsPerPage}
              classCount={sortedPrompts?.length ?? 0}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />

            {/* <PreviewClass
        classData={classes.find((cls) => cls.id === previewClass)}
        previewClass={previewClass}
        onDelete={(e) => handleDeleteClick(e)}
        setPreviewClass={(e) => setPredictHisID(e)}
      ></PreviewClass>*/}

            <DeleteModle
              handleDeleteConfirm={handleDeleteConfirm}
              setClassToDelete={(e) => setPromptHisToDelete(e)}
            />
          </div>
        ) : (
          <div className="flex text-cta-gray w-full p-5 sm:pt-0">
            {" Have't Posts  "}
          </div>
        )}
      </div>
    </div>
  );
}