"use client";
 
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function ButtonReturn() {
  const router = useRouter();

  const handleReturn = () => {
    router.back();
  };
  const handleForward = () => {
    router.forward();
  };

  return (
    <div className="z-100 flex items-center justify-center ">
      <button
        type="button"
        className="flex items-center justify-center  my-2 transition-colors duration-300 transform text-cta-text hover:border border-border rounded-md w-8 h-8  hover:text-tan ml-3 mr-1 md:my-0"
        onClick={handleReturn}
      >
        <IoIosArrowBack className="-z-10"/>
      </button>
      <button
        type="button"
        className="flex items-center justify-center  my-2 transition-colors duration-300 transform text-cta-text hover:border border-border rounded-md w-8 h-8  hover:text-tan ml-3 mr-1 md:my-0"
        onClick={handleForward}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}
