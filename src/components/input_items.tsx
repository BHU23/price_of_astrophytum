
import { useState } from "react";
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
   const [isVisited, setIsVisited] = useState(false);

   const handleBlur = () => {
     setIsVisited(true);
   };

   const showError = isVisited && !value;
  return (
    <label className="text-cta-text text-sm font-semibold" htmlFor={htmlFor}>
      {name} <span className="text-red-400 text-start text-sm">*</span>
      <input
        className="bg-gray-50 font-normal border mt-2 h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear
    [&:not(:placeholder-shown):invalid~span]:block 
    focus:invalid:[&:not(:placeholder-shown)]:border-red-400 
    focus:invalid:[&:not(:placeholder-shown)]:ring-red-400 "
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={handleChange}
        required
        pattern={pattern}
        aria-invalid="true"
        aria-describedby={`${id}-error`}
        onBlur={handleBlur}
      />
      <span id={`${id}-error`} className="mt-2 hidden text-sm text-red-400">
        {textError}
      </span>
      {showError && (
        <p className="mt-2 text-sm text-red-400">
          Opp! Please enter {'"'}
          {name}
          {'"'}, this field is required.
        </p>
      )}
    </label>
  );
}
