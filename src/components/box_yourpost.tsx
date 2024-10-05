import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import Image from "next/image";
import { FiArrowRight, FiTrash } from "react-icons/fi";
import { format } from "date-fns";
import DeleteModle from "./delete_model";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
interface BoxPostInt {
  prediction: HistoryPredicstionInterface;
  key: number;
  onClick: () => void;
  setPredictHisToDelete: (n: number | null) => void;
  handleDeleteConfirm: () => void;
  handleDeleteClick: (n: number) => void;
}

export default function BoxPost({
  prediction,
  onClick,
  setPredictHisToDelete,
  handleDeleteConfirm,
  handleDeleteClick,
}: BoxPostInt) {
  const formatDate = (timestamp: Date) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return format(date, "dd-MM-yyyy HH:mm a");
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
        {prediction.total_min.toLocaleString()} -
        {prediction.total_max.toLocaleString()} ฿
        <p className="text-gray-600">
          {formatDate(new Date(prediction.timestamp))}
        </p>
      </span>
      <div className=" flex justify-between">
        <button
          className="flex justify-center items-center bg-pear rounded-md w-auto px-5 py-1 text-black hover:bg-tan cursor-pointer focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
          onClick={() => onClick()}
        >
          {" "}
          open
        </button>

        <button
          type="button"
          className=" flex flex-row gap-2  text-red-500 w-auto rounded-md  px-4 py-2 text-left text-sm justify-center items-center  cursor-pointer focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
          role="menuitem"
          tabIndex={-1}
          id="menu-item-5"
          onClick={() => handleDeleteClick(prediction.id)}
        >
          <FiTrash /> Delete
        </button>
      </div>
      <DeleteModle
        handleDeleteConfirm={handleDeleteConfirm}
        setClassToDelete={(e) => setPredictHisToDelete(e)}
      />
    </div>
  );
}
