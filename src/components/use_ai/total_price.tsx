interface TotalPriceicProp {
  total: string;
  price_min: number;
  price_max: number;
}
export default function TotalPrice({ total, price_min, price_max }: TotalPriceicProp) {
  return (
    <div>
      <div className="flex justify-center items-center text-cta-active  font-semibold dark:bg-cta-gray bg-gray-300 h-10 rounded-lg">
        {/* Total */}
        {/* <span>{total}</span> */}
        <span>
          {price_min}-{price_max} ฿
        </span>
      </div>
    </div>
  );
}
