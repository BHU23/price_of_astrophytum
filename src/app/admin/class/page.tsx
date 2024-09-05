"use client";
import React, { useState } from "react";
import { DeleteClassByID, useClasses } from "./hook";
import FetchingState from "@/components/fetching_state";
import ActionTable from "@/components/action_table";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination";
import Image from "next/image";

export default function Class() {
  const router = useRouter();
  const { classes, loading, error } = useClasses();
  const [currentPage, setCurrentPage] = useState(1);
  const [classToDelete, setClassToDelete] = useState<number | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(classes.length / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedClasses = classes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (classID: number) => {
    router.push(`/admin/class/${classID}`);
  };

  const handleDeleteClick = (classID: number) => {
    setClassToDelete(classID);
    const modal = document.getElementById("deleteModal");
    if (modal) modal.classList.remove("hidden");
  };

  const handleDeleteConfirm = async () => {
    if (classToDelete !== null) {
      const success = await DeleteClassByID(String(classToDelete));
      if (success) {
        console.log("Class deleted successfully");
        // Refresh or update the UI after deletion
        router.refresh(); // Refresh the page or trigger re-fetching
      } else {
        console.error("Failed to delete the class");
      }
      setClassToDelete(null);
      const modal = document.getElementById("deleteModal");
      if (modal) modal.classList.add("hidden");
      window.location.reload();
    }
  };

  const handleDeleteCancel = () => {
    setClassToDelete(null);
    const modal = document.getElementById("deleteModal");
    if (modal) modal.classList.add("hidden");
  };

  if (loading) return <FetchingState state="Loading..." />;
  if (error) return <FetchingState state={`Error: ${error}`} />;

  return (
    <div className="relative shadow-md rounded-xl m-5 mt-0 p-5  bg-card ">
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap space-y-4 md:space-y-0 pb-4 ">
        <div>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="inline-flex items-center h-10 text-cta-gray bg-background border border-border focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus:ring-1 focus:border-pear focus:ring-pear "
            type="button"
            onClick={() => router.push(`/admin/class/create`)}
          >
            <FiPlus />
            &nbsp;Create New
          </button>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-cta-gray"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-cta-text border border-border rounded-lg w-80 bg-background focus:ring-1 focus:ring-pear focus:border-pear placeholder-cta-gray "
            placeholder="Search for users"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-cta-gray uppercase bg-background">
          <tr>
            <th scope="col" className="p-4">
              {/* <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div> */}
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Extra Value
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 flex items-center justify-center w-full h-full"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedClasses.map((cls, index) => (
            <tr
              key={cls.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center justify-center">
                  {/*   <input
                    id={`checkbox-table-search-${cls.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${cls.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>*/}

                  {itemsPerPage*(currentPage-1) + index + 1}
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Image
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                  src={cls.example_image}
                  alt={`${cls.name} image`}
                />

                <div className="pl-3 ">
                  <div className="text-base font-semibold">{cls.name}</div>
                  <p className="font-normal text-gray-500 h-auto text-start w-20 md:w-60 truncate">
                    {cls.description}
                  </p>
                </div>
              </th>
              <td className="px-6 py-4">{cls.extra_value}</td>
              <td className="px-6 py-4">
                {cls.price?.value_min} - {cls.price.value_max}
              </td>
              <td className="px-6 py-4 h-full">
                <ActionTable
                  ID={cls.id}
                  handleDelete={() => handleDeleteClick(cls.id)}
                  handleEdit={() => handleEdit(cls.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        classCount={classes.length }
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <div
        id="deleteModal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden fixed inset-0 z-[99999]  flex justify-center overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          {/* Modal content */}
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleDeleteCancel}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={handleDeleteCancel}
              >
                No, cancel
              </button>
              <button
                type="button"
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={handleDeleteConfirm}
              >
                Yes, I&apos;m sure.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
