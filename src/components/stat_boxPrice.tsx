import { GiTwoCoins } from "react-icons/gi";
interface StatBoxProps {
  name: string;
  count: string;
}

export default function StatBoxPrice({ name, count }: StatBoxProps) {
  return (
    <div className="flex-col rounded-md bg-card w-full shadow-md">
      <div className="flex flex-row justify-between p-4">
        <div className="font-semibold">{name}</div>
        <div>
          <GiTwoCoins className="w-5 h-5 fill-current text-tan" />
        </div>
      </div>
      <div className="flex justify-center items-center pb-10 text-4xl px-2 text-center">
        {count}
      </div>
    </div>
  );
}
