import { MdInfoOutline } from "react-icons/md";

interface BoxTypeProp {
  typeName: string;
  price_min: number;
  price_max: number;
}
export default function BoxType({
  typeName,
  price_min,
  price_max,
}: BoxTypeProp) {
  return (
    <div className="flex flex-row justify-between flex-wrap gap-5">
      <div className="relative inline-flex items-center justify-between p-2 text-sm font-medium text-cta-text rounded-lg  min-w-48 h-10 text-center border border-border">
        {typeName}
        <div className="relative group">
          <MdInfoOutline className="w-4 h-4" />
          <div className="absolute hidden group-hover:block bg-background text-white text-sm rounded py-2 px-4 bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
            <p className="m-0">Info text</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        ฿{price_min}-{price_max}/ต้น
      </div>
    </div>
  );
}
