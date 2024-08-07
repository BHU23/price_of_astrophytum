interface TotalPriceicProp {
  total: string;
  price_min: number;
  price_max: number;
}
export default function TotalPrice({ total, price_min, price_max }: TotalPriceicProp) {
  return (
    <div>
      <div className="flex flex-row justify-between text-gray-700 text-lg font-semibold dark:text-gray-200 my-6">
        Total
        {/* <span>{total}</span> */}
        <span>
          {price_min}-{price_max}฿
        </span>
      </div>
    </div>
  );
}
