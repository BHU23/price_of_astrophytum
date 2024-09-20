import { useState, useEffect, useRef } from "react";

interface DropdownMonthProps {
  month: number | null;
  setMonth: (month: number | null) => void;
}

export function DropdownMonth({ month, setMonth }: DropdownMonthProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        className="text-sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-controls="dropdownMonth"
      >
        <div
          className={`min-w-32 inline-flex items-center gap-5 justify-between bg-gray-50 border h-10 pr-2 border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-background dark:border-gray-600  ${
            isDropdownOpen ? "ring-1 ring-pear" : ""
          } `}
        >
          <span className={`${month ? "text-cta-text" : "text-gray-500"}`}>
            {months[(month ?? "0")] || "Select Month"}
          </span>
          <svg
            className="w-2.5 h-2.5"
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
      </label>

      {isDropdownOpen && (
        <div
          id="dropdownMonth"
          className="z-10 bg-background border border-border divide-y divide-gray-100 rounded-md shadow w-full mt-1 absolute overflow-hidden p-1"
        >
          <ul className="text-sm">
            {months.map((m) => (
              <li key={m}>
                <div
                  onClick={() => {
                    setMonth(
                      m === "All Months" ? null : months.indexOf(m)
                    );
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                    String(month) === m
                      ? "bg-card text-cta-text"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {m}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
