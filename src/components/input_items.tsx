interface InputItemsProps {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  value: string;
  htmlFor: string;
  placeholder: string;
  pattern: string;
  textError: string;
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
  pattern,
  textError,
  handleChange,
}: InputItemsProps) {
  return (
    <label className="text-cta-text  text-sm" htmlFor={htmlFor}>
      {name}
      <input
        // className="block w-full mt-2 h-10 pr-2 text-sm text-cta-text border bg-card border-border rounded-lg cursor-pointer corder-gray-300  p-2.5  placeholder-gray-400 hover:bg-ring_gray focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
        className="bg-gray-50 border mt-2 h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
          [&:not(:placeholder-shown):invalid~span]:block 
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
          focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400
       "
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={handleChange}
        required
        pattern={pattern}
        
      />
      <span className="mt-1 hidden text-sm text-red-400">{textError}</span>
    </label>
  );
}
