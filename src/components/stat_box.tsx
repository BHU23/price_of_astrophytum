
interface StatBoxProps {
  name: string;
  count: number;
}

export default function StatBox({ name, count }: StatBoxProps) {


  return (
    <div className="flex-col rounded-md bg-card w-full shadow-md">
      <div className="flex flex-row justify-between p-4">
              <div className="font-semibold">{ name}</div>
        <div>
          <svg
            className="h-5 w-5 fill-current text-tan transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center pb-10 text-5xl">{count}</div>
    </div>
  );
}