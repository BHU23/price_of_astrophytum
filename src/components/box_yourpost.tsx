import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { format } from "date-fns";
interface BoxPostInt {
  prediction: HistoryPredicstionInterface;
  key: number;
  onClick: () => void;
}

export default function BoxPost({ prediction, onClick }: BoxPostInt) {
  const formatDate = (timestamp : Date) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return format(date, "HH:mm dd-MM-yyyy"); // Formats to 15:00 27-09-2021
  };
  return (
    <div className="flex flex-col gap-4 p-4 bg-card shadow-md border dark:border-border rounded-md">
      <div className="flex justify-center items-center w-full h-40">
        <Image
          width={500}
          height={500}
          className="rounded-md object-cover h-full w-auto"
          src={prediction.image}
          alt="img"
        />
      </div>

      <span>
        {prediction.total_min} -{prediction.total_max} ฿
      
      <p className="text-gray-600">
        {formatDate(new Date(prediction.timestamp))}
      </p></span>
      <button
        className="flex justify-center items-center bg-pear rounded-md w-auto px-2 py-1 text-black hover:bg-tan cursor-pointer focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
        onClick={() => onClick()}
      >
        {" "}
        open
      </button>
    </div>
  );
}
