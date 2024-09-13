interface ButtonItemsProps {
  name: string;
  loading: boolean;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  withs: string;
}

export default function ButtonItems({
  name,
  onClick,
  type,
  withs,
  loading,
}: ButtonItemsProps) {
  return (
    <button
      type={type}
      className={`text-white bg-gradient-to-br from-pear to-tan hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-pear font-medium rounded-lg text-sm px-5 py-2.5 text-center w-${withs}`}
      onClick={onClick}
      disabled={loading}
    >
      {name}
    </button>
  );
}
