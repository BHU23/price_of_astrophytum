import { useState } from "react";

interface DropdownItemProps {
  name: string;
  value: string;
  data: any[];
  onChange: (d: number|string | null) => void;
}

export default function DropdownItem({ name, value,data, onChange }: DropdownItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative">
      <div
        id="dropdownActionButton"
        data-dropdown-toggle="dropdownAction"
        className={`inline-flex items-center justify-between bg-gray-50 border mt-2 h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
          isDropdownOpen ? "ring-1 ring-pear" : ""
        }`}
        typeof="button"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
          const dropdown = document.getElementById("dropdownAction");
          if (dropdown) {
            dropdown.classList.toggle("hidden");
          }
        }}
      >
        <span className="sr-only">Select a {name}</span>
        {/* {formDataClass.price.value_min
          ? `${formDataClass.price.value_min} - ${formDataClass.price.value_max}`
          : "Select a price"} */}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      <div
        id="dropdownAction"
        className="z-10 hidden bg-background border border-border divide-y divide-gray-100 rounded-lg shadow w-full mt-1 absolute overflow-hidden"
      >
        <ul className="text-sm " aria-labelledby="dropdownActionButton">
          {data.map((d) => (
            <li key={d.id}>
              <div
                onClick={() => {
                  onChange(d);
                  const dropdown = document.getElementById("dropdownAction");
                  if (dropdown) {
                    dropdown.classList.add("hidden");
                  }
                }}
                className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                  d.id == value
                    ? "bg-card text-cta-text"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                d.
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}