interface BoxPostInt {
  img: any;
}

export default function BoxPost({ img }: BoxPostInt) {
  return (
    <div className="flex flex-col bg-pear rounded-md  w-auto ">
      <div className="flex justify-center items-center">
        <img className="rounded-md object-contain " src={img} />
      </div>
      <div className="text-black font-bold flex justify-center m-1 cursor-pointer ">
        เลือก
      </div>
    </div>
  );
}