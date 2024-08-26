import Image from "next/image";

interface BoxPostInt {
  img: any;
}

export default function BoxPost({ img }: BoxPostInt) {
  return (
    <div className="flex flex-col bg-pear rounded-md  w-auto ">
      <div className="flex justify-center items-center">
        <Image
          width={500}
          height={500}
          className="rounded-md object-contain "
          src={img}
          alt=""
        />
      </div>
      <div className="text-black font-bold flex justify-center m-1 cursor-pointer ">
        เลือก
      </div>
    </div>
  );
}