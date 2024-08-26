interface InputItemsProps {
  name: string;
  type: string;
  htmlFor: string;
  placeholder: string;
  handleChange: (e: any) => void;
}

export default function InputItems({ name, type, htmlFor, placeholder, handleChange }: InputItemsProps) {
  return (
    <label
      className="text-cta-text font-semibold text-sm "
      htmlFor={htmlFor}
    >
      {name}
      <input
        className="block w-full mt-5 h-10 pr-2 text-sm text-cta-text border bg-background border-border rounded-lg cursor-pointer corder-gray-300  p-2.5  placeholder-gray-400  focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      ></input>
    </label>
  );
}
