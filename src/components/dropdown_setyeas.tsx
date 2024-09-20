import { useState, useEffect, useRef } from "react";

interface DropdownYearProps {
  year: number | null;
  setYear: (year: number | null) => void;
}

export function DropdownYear({ year, setYear }: DropdownYearProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(String(year) ?? "");
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

 const currentYear = new Date().getFullYear();
 let lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);

 if (inputValue) {
   lastFiveYears = Array.from({ length: 100 }, (_, i) => currentYear - i)
     .filter((year) => year.toString().includes(inputValue))
     .slice(0, 5);;
 }


  const handleYearSelect = (selectedYear: number | null) => {
    setYear(selectedYear);
    setInputValue(selectedYear !== null ? selectedYear.toString() : "");
    setIsDropdownOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const parsedYear = parseInt(value);
    if (!isNaN(parsedYear) && parsedYear > 0) {
      setYear(parsedYear);
    } else {
      setYear(null);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="text-sm cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
        aria-controls="dropdownYear"
      >
        <div
          className={` min-w-32 inline-flex items-center gap-5 justify-between bg-gray-50  border h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-background dark:border-gray-600  dark:text-white ${
            isDropdownOpen ? "ring-1 ring-pear" : ""
          }`}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Select Year"
            className="flex-grow p-1 w-24 border-none focus:ring-0 focus:outline-none bg-transparent text-sm placeholder:text-gray-500"
          />
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
      </div>

      {isDropdownOpen && (
        <div
          id="dropdownYear"
          className="max-h-40 overflow-y-scroll z-10 bg-background border border-border divide-y divide-gray-100 rounded-md shadow w-full mt-1 absolute overflow-hidden p-1"
        >
          <ul className="text-sm">
            <li>
              <div
                onClick={() => handleYearSelect(null)} // Option for "All Years"
                className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                  year === null
                    ? "bg-card text-cta-text"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                All Years
              </div>
            </li>
            {lastFiveYears.map((y) => (
              <li key={y}>
                <div
                  onClick={() => handleYearSelect(y)}
                  className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                    year === y
                      ? "bg-card text-cta-text"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {y}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
