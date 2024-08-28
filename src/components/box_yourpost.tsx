import Image from "next/image";

interface BoxPostInt {
  img: string;
  key: number; 
  onClick: () => void;
}

export default function BoxPost({ img, onClick }: BoxPostInt) {
  return (
    <button
      className="flex flex-col bg-pear rounded-md w-auto hover:bg-tan cursor-pointer focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
      onClick={() => onClick()}
    >
      <div className="flex justify-center items-center w-full h-40">
        <Image
          width={500}
          height={500}
          className="rounded-md object-cover h-full w-full"
          src={img}
          alt="img"
        />
      </div>
      <div className="text-black font-bold flex justify-center items-center p-1 w-full">
        Click
      </div>
    </button>
  );
}
