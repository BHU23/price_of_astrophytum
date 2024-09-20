import { useState, useEffect, useRef } from "react";

interface DropdownItemProps {
  sortOrder: string;
  setSortOrder: (order: "latest" | "oldest") => void;
}

export default function DropdownSort({
  sortOrder,
  setSortOrder,
}: DropdownItemProps) {
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

  return (
    <div className="sm:col-span-full relative" ref={dropdownRef}>
      <label
        className="text-cta-text text-sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-controls="dropdownAction"
      >
        <div
          id="dropdownActionButton"
          className={`min-w-40 inline-flex items-center gap-5 justify-between bg-gray-50 border h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-background dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
            isDropdownOpen ? "ring-1 ring-pear" : ""
          }`}
        >
          <span className="sr-only">Sort order</span>
          {sortOrder === "latest" ? "Latest First" : "Oldest First"}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
            aria-hidden="true"
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
        {isDropdownOpen && (
          <div
            id="dropdownAction"
            className="z-10 bg-background border border-border divide-y divide-gray-100 rounded-md shadow w-full mt-1 absolute overflow-hidden p-1"
          >
            <ul className="text-sm">
              <li>
                <div
                  onClick={() => {
                    setSortOrder("latest");
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                    sortOrder === "latest"
                      ? "bg-card text-cta-text"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Latest First
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    setSortOrder("oldest");
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                    sortOrder === "oldest"
                      ? "bg-card text-cta-text"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Oldest First
                </div>
              </li>
            </ul>
          </div>
        )}
      </label>
    </div>
  );
}
