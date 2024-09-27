import { RoleInterface } from "@/interface/hostoryprompt.interface";
import { ListRoles } from "@/service/https/role";
import { useState, useEffect, useRef } from "react";

interface DropdownRolesProps {
  role: number | null;
  setRole: (role: number | null) => void;
}

export function DropdownRoles({ role, setRole }: DropdownRolesProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [roles, setRoles] = useState<RoleInterface[]>([]); 
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

  // const roles = [
  //   "ผู้ขาย",
  //   "ผู้ซื้อ",
  //   "นักรีวิว",
  //   "คนทั่วไป",
  //   "เจ้าของสวน",
  //   "นายหน้า",
  //   "อื่นๆ"
  // ]; // รายการ roles
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const result = await ListRoles();
        if (result) {
          setRoles(result);
        }
      } catch (error) {
        console.error("Error fetching styles:", error);
      }
    };

    fetchStyles();
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        className="text-sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-controls="dropdownRoles"
      >
        <div
          className={`min-w-32 inline-flex items-center gap-5 justify-between bg-gray-50 border h-10 pr-2 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-transparent dark:border-gray-600 ${
            isDropdownOpen ? "ring-1 ring-pear" : ""
          }`}
        >
          <span className={`${role ? "text-cta-text" : "text-gray-500"}`}>
            {role !== null
              ? roles.find((r) => r.id === role)?.name
              : "Select Role"}
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
            id="dropdownRoles"
            className="h-40 overflow-y-scroll z-10 bg-background border border-border divide-y divide-gray-100 rounded-md shadow w-full mt-1 absolute overflow-hidden p-1"
          >
            <ul className="text-sm">
              <li>
                <div
                  onClick={() => {
                    setRole(null); // ตั้งค่า role เป็น null สำหรับ "All Roles"
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 w-full text-left hover:bg-white ${
                    role === null ? "bg-card text-cta-text" : "text-gray-700"
                  }`}
                >
                  Select Roles
                </div>
              </li>
              {roles.map((r) => (
                <li key={r.id}>
                  <div
                    onClick={() => {
                      setRole(r.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                      role === r.id
                        ? "bg-card text-cta-text"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {r.name}
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
