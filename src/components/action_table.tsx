"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
interface ActionTableProp {
  ID: number;
  handleDelete: () => void;
  handleEdit: () => void;
}

export default function ActionTable({ ID, handleEdit, handleDelete }: ActionTableProp) {
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setTimeout(() => setIsOpen(false), 200);

  return (
    <div
      className="relative inline-block text-left justify-center left-1/2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative py-2">
        <FiMoreVertical />
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-4"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-5"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
