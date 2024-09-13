import React from "react";


interface ButtonUploadProp {
  name: string;
  isShow:boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ButtonReload({
  name,
  isShow,
  handleFileChange,
}: ButtonUploadProp) {
  return (
    <div>
    <input
        className={`block w-full h-10 pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer file:p-2 file:font-semibold file:h-full file:rounded-md file:border-0 file:bg-gray-800 file:text-pear file:text-sm file:mr-2 dark:hover:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4 ${isShow ? "border-red-500" : ""}`}
      id="dropzone-file"
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    ></input>
     {isShow && (
          <p className="mt-2 text-sm text-red-400">
            Opp! Please enter {'"'}
            Nudum image
            {'"'}, this field is required.
          </p>
        )}</div>
  );
}
