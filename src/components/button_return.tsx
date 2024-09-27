import { useRouter } from "next/navigation";

interface ButtonReturnItemsProps {
  name: string;
}

export default function ButtonReturn({ name }: ButtonReturnItemsProps) {
  const router = useRouter();
  const handleButtonClick = () => {
    router.back();
  };
  return (
    <button
      type="button"
      className="text-sm font-semibold leading-6 text-cta  rounded-lg px-5 py-2 text-center w-28 transition-colors duration-300 transform   border border-transparent hover:border-black hover:border-border  hover:text-tan  ring-ring_gray focus:outline-none focus:z-10 ring-2 dark:focus:ring-4"
      onClick={handleButtonClick}
    >
      {name}
    </button>
  );
}
