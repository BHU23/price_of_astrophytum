import { useState, useEffect, useRef } from "react";

interface DropdownStylesProps {
  style: string | null;
  setStyle: (style: string | null) => void;
}

export function DropdownStyles({ style, setStyle }: DropdownStylesProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  // Define the styles
  const styles = [
    "สนุกสนาน", // Fun
    "วิชาการ", // Academic
    "ทางการ", // Formal
    "ทั่วไป", // General
    "สร้างสรร", // Creative
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        className="text-sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-controls="dropdownStyles"
      >
        <div
          className={`min-w-32 inline-flex items-center gap-5 justify-between bg-gray-50 border h-10 pr-2 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-transparent dark:border-gray-600 ${
            isDropdownOpen ? "ring-1 ring-pear" : ""
          }`}
        >
          <span className={`${style ? "text-cta-text" : "text-gray-500"}`}>
            {style !== null ? style : "Select Style"}
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

        {isDropdownOpen && (
          <div
            id="dropdownStyles"
            className="h-40 overflow-y-scroll z-10 bg-background border border-border divide-y divide-gray-100 rounded-md shadow w-full mt-1 absolute overflow-hidden p-1"
          >
            <ul className="text-sm">
              <li>
                <div
                  onClick={() => {
                    setStyle(null); // Set to null for "All Styles"
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 w-full text-left hover:bg-white ${
                    style === null ? "bg-card text-cta-text" : "text-gray-700"
                  }`}
                >
                  Select Style
                </div>
              </li>
              {styles.map((s) => (
                <li key={s}>
                  <div
                    onClick={() => {
                      setStyle(s);
                      setIsDropdownOpen(false);
                    }}
                    className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                      style === s
                        ? "bg-card text-cta-text"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {s}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </label>
    </div>
  );
}
