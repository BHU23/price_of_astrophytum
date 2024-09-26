import Image from "next/image";
import { MdInfoOutline } from "react-icons/md";

interface BoxTypeProp {
  image: string;
  description: string;
  typeName: string;
  price_min: number;
  price_max: number;
}
export default function BoxType({
  image,
  description,
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
          {/* <div className="absolute hidden group-hover:block h-auto w-64 bg-background rounded-lg left-40 -top-3 transform -translate-x-1/2 "> */}
          <div className="absolute hidden group-hover:block h-auto w-64 bg-white dark:bg-card dark:border dark:border-border rounded-lg left-4 transform -translate-x-1/2 z-50">
            <div className="max-w-sm rounded overflow-hidden shadow-lg  flex justify-center items-center flex-col p-5">
              <Image
                width={500}
                height={500}
                className="w-auto h-40 rounded-lg "
                src={image}
                alt="image"
              />
              <div className="text-start pt-2">
                <div className="font-bold text-lg my-2">{typeName}</div>
                <p className="text-cta ">{description}</p>
              </div>
              {/* <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        ฿{price_min.toLocaleString()}-{price_max.toLocaleString()}/ต้น
      </div>
    </div>
  );
}
