interface TotalPriceicProp {
  total: string;
}
export default function TotalPrice({ total }: TotalPriceicProp) {
  return (
    <div>
      <div className="flex flex-row justify-between text-gray-700 text-lg font-semibold dark:text-gray-200 my-6">
        Total
        <span>{total}</span>
      </div>
    </div>
  );
}
