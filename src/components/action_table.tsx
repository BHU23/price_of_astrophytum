"use client";

import { useState } from "react";
import { FiMoreVertical, FiEdit, FiEye, FiTrash } from "react-icons/fi";
interface ActionTableProp {
  handleDelete: () => void;
  handleEdit: () => void;
  handlePreview: () => void;
}

export default function ActionTable({
  handleEdit,
  handleDelete,
  handlePreview,
}: ActionTableProp) {
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setTimeout(() => setIsOpen(false), 200);

  return (
    <div
      className="relative flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex justify-center items-center py-5 px-5">
        <FiMoreVertical />
      </div>

      {isOpen && (
        <div
          className="absolute right-1/2 -bottom-[100px]  z-10 w-32 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              type="button"
              className=" flex flex-row gap-2 items-center  w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-cta-gray hover:bg-gray-100 dark:hover:bg-card"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-4"
              onClick={handleEdit}
            >
              <FiEdit /> Edit
            </button>
            <button
              type="button"
              className=" flex flex-row gap-2 items-center  w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-cta-gray hover:bg-gray-100 dark:hover:bg-card"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-4"
              onClick={handlePreview}
            >
              <FiEye /> Preview
            </button>
            <button
              type="button"
              className=" flex flex-row gap-2 items-center text-red-500 w-full px-4 py-2 text-left text-sm  hover:bg-gray-100 dark:hover:bg-card"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-5"
              onClick={handleDelete}
            >
              <FiTrash /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
