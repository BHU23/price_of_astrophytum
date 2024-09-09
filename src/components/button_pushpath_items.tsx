
"use client";

import { useRouter } from "next/navigation";

interface ButtonPushPathItemsProps {
  name: string;
  path: string;
}

export default function ButtonPushPathItems({ name, path }: ButtonPushPathItemsProps) {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(path);
  };
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-pear to-tan hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-pear font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
      onClick={handleButtonClick}
    >
      {name} 
    </button>
  );
}
