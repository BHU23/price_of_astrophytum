import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import "tailwindcss/tailwind.css";
import { parseISO } from "date-fns";
import { useTheme } from "next-themes";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartProps {
  series: string;
  title?: string;
  subtitle?: string;
  config?: ApexOptions;
  filteredOnDayMonthYear?: Array<{ timestamp: string }>;
  year: number | null;
  month: number | null;
  day: number | null;
  count: number | null;
}

const BarChart = ({
  series = "Data",
  title = "Bar Chart",
  subtitle = "Visualize your data",
  config = {},
  filteredOnDayMonthYear = [],
  year,
  month,
  day,
  count,
}: BarChartProps) => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  console.log("yearmonthday", year, month, day);
  const getCategories = useMemo(() => {
    if (year && month && day) {
      return Array.from({ length: 24 }, (_, i) => i.toString());
    } else if (year && month) {
      const daysInMonth = new Date(year, month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    } else if (month) {
      const daysInMonth = new Date(currentYear, month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    } else if (day) {
      return Array.from({ length: 24 }, (_, i) => (i + 1).toString());
    } else if (year) {
      return Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    } else {
      return Array.from({ length: 10 }, (_, i) =>
        (currentYear - i).toString()
      ).reverse();
    }
  }, [year, month, day, currentYear]);

  const categories = getCategories;
  console.log("categories", categories);

  const [chartData, setChartData] = useState<number[]>(
    Array(getCategories.length).fill(0)
  );
  useEffect(() => {
    let totalCount = 0;
    const data = Array(categories.length).fill(0);

    if (Array.isArray(filteredOnDayMonthYear)) {
      filteredOnDayMonthYear.forEach((prediction) => {
        const predictionDate = parseISO(prediction.timestamp);

        if (year && month && day) {
          if (
            predictionDate.getFullYear() === year &&
            predictionDate.getMonth() + 1 === month &&
            predictionDate.getDate() === day
          ) {
            const hourIndex = predictionDate.getHours();
            data[hourIndex] += 1;
            totalCount += 1;
          }
        } else if (year && month) {
          if (
            predictionDate.getFullYear() === year &&
            predictionDate.getMonth() + 1 === month
          ) {
            const dayIndex = predictionDate.getDate() - 1;
            data[dayIndex] += 1;
            totalCount += 1;
          }
        } else if (day && year) {
          if (
            predictionDate.getDate() === day &&
            predictionDate.getFullYear() === year
          ) {
            const hourIndex = predictionDate.getHours();
            data[hourIndex] += 1;
            totalCount += 1;
          }
        } else if (day && month) {
          if (
            predictionDate.getDate() === day &&
            predictionDate.getMonth() + 1 === month
          ) {
            const hourIndex = predictionDate.getHours();
            data[hourIndex] += 1;
            totalCount += 1;
          }
        } else if (month) {
          if (predictionDate.getMonth() + 1 === month) {
            const dayIndex = predictionDate.getDate() - 1;
            data[dayIndex] += 1;
            totalCount += 1;
          }
        } else if (year) {
          if (predictionDate.getFullYear() === year) {
            const monthIndex = predictionDate.getMonth();
            data[monthIndex] += 1;
            totalCount += 1;
          }
        } else if (day) {
          if (predictionDate.getDate() === day) {
            const hourIndex = predictionDate.getHours();
            data[hourIndex] += 1;
            totalCount += 1;
          }
        } else {
          const yearIndex = categories.findIndex(
            (category) => parseInt(category) === predictionDate.getFullYear()
          );
          if (yearIndex !== -1) {
            data[yearIndex] += 1;
            totalCount += 1;
          }
        }
      });
    } else {
      console.warn(
        "filteredOnDayMonthYear is not an array:",
        filteredOnDayMonthYear
      );
    }

    console.log("Total predictions for the selected period:", totalCount);
    setChartData(data);
  }, [filteredOnDayMonthYear, year, month, day, categories]);

  const chartConfig = useMemo(
    () => ({
      series: [{ name: series, data: chartData }],
      chart: {
        type: "bar" as const, // Ensure 'type' is a string literal
        height: 280,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: "easeinout" as const, // Ensure 'easing' is a string literal
          speed: 800,
        },
      },
      dataLabels: { enabled: false },
      colors: [theme === "dark" ? "#f9fafb" : "#020617"], // Adjust colors based on the theme
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        categories: getCategories,
        labels: {
          style: {
            colors: theme === "dark" ? "#f9fafb" : "#616161", // Adjust label colors for dark mode
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme === "dark" ? "#f9fafb" : "#616161", // Adjust y-axis label colors
            fontSize: "12px",
          },
        },
      },
      grid: {
        borderColor: theme === "dark" ? "#374151" : "#dddddd", // Adjust grid color for dark mode
        strokeDashArray: 5,
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: theme === "dark" ? "dark" : "light" }, // Adjust tooltip theme
      ...config,
    }),
    [chartData, config, getCategories, series, theme]
  );

  return (
    <div className="relative flex flex-col rounded-xl bg-card shadow-md p-4 w-full h-auto">
      <div className="relative mx-4 mt-4 flex flex-col sm:flex-row md:items-center gap-4  justify-between">
        <div className="relative flex flex-col sm:flex-row md:items-center gap-4">
          <div className="w-max rounded-lg bg-background p-5 text-cta-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
              />
            </svg>
          </div>
          <div>
            <h6 className="font-sans text-base font-semibold leading-relaxed text-cta-text">
              {title}
            </h6>
            <p className="text-sm text-cta-gray">{subtitle}</p>
          </div>
        </div>
        {count && (
          <div className=" text-cta-gray flex justify-center items-center gap-2"> total:
            <div className="text-lg text-cta-text items-end">{count}</div>
          </div>
        )}
      </div>

      <div className="pt-5 px-2 pb-0 overflow-x-auto">
        <ApexCharts
          options={chartConfig}
          series={[{ name: series, data: chartData }]}
          type="bar"
          height={325}
        />
      </div>
    </div>
  );
};

export default BarChart;
