interface BoxTypeProp {
  typeName: string;
  price_min: number;
  price_max: number;
}
export default function BoxType({ typeName, price_min, price_max }: BoxTypeProp) {
  return (
    <div className="flex flex-row justify-between">
      <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 min-w-32 text-center">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 min-w-32">
          {typeName}
        </span>
      </div>
      <div className="flex items-center justify-center">
        ฿{price_min}-{price_max}/ต้น
      </div>
    </div>
  );
}
