interface InputItemsProps {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  value: string;
  htmlFor: string;
  placeholder: string;
  handleChange: (e: any) => void;
}

export default function InputItems({
  id,
  name,
  type,
  htmlFor,
  placeholder,
  value,
  autoComplete,
  handleChange,
}: InputItemsProps) {
  return (
    <label className="text-cta-text font-semibold text-sm" htmlFor={htmlFor}>
      {name}
      <input
        className="block w-full mt-2 h-10 pr-2 text-sm text-cta-text border bg-card border-border rounded-lg cursor-pointer corder-gray-300  p-2.5  placeholder-gray-400 hover:bg-ring_gray focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={handleChange}
      />
    </label>
  );
}
