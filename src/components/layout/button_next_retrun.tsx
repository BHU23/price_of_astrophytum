"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function ButtonNextReturn() {
  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };
  const handleForward = () => {
    router.forward();
  };

  return (
    <div className="z-100 flex items-center justify-center gap-2 ">
      <button
        type="button"
        className="flex items-center justify-center cursor-pointer my-2 transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md w-8 h-8 hover:text-tan  md:my-0 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-card  dark:hover:bg-gray-700"
        onClick={handleReturn}
      >
        <IoIosArrowBack className="-z-10" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center cursor-pointer my-2 transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md w-8 h-8 hover:text-tan  md:my-0 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-card  dark:hover:bg-gray-700"
        onClick={handleForward}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}
