"use client";
import React, { useState } from "react";

import FetchingState from "@/components/fetching_state";
import ActionTable from "@/components/action_table";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination";
import Image from "next/image";
import DeleteModle from "@/components/delete_model";
import { DeleteUserProfileByID, useUserProfile } from "./hook";
import profile from "../../../../public/profile_default_png.png";
import PreviewUser from "@/components/preview_user";

export default function User() {
  const router = useRouter();
  const { userProfiles, loading, error } = useUserProfile();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(userProfiles?.length / itemsPerPage);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Search Logic
  const filteredUsers = userProfiles.filter((cls) =>
    cls.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort Logic
  const getNestedValue = (obj: any, key: string) => {
    return key.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (!sortKey) return 0;

    const valueA = getNestedValue(a, sortKey);
    const valueB = getNestedValue(b, sortKey);

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [previewUser, setPreviewUser] = useState<number | null>(null);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedUser = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleEdit = (userID: number) => {
    router.push(`/admin/user/${userID}`);
  };

  const handlePreview = (userID: number) => {
    setPreviewUser(userID);
    const modal = document.getElementById("previewModal");
    if (modal) modal.classList.remove("hidden");
  };

  const handleDeleteClick = (userID: number) => {
    setUserToDelete(userID);
    const modal = document.getElementById("deleteModal");
    if (modal) modal.classList.remove("hidden");
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete !== null) {
      const success = await DeleteUserProfileByID(userToDelete);
      if (success) {
        console.log("Class deleted successfully");
        router.refresh();
      } else {
        console.error("Failed to delete the class");
      }
      setUserToDelete(null);
      const modal = document.getElementById("deleteModal");
      if (modal) modal.classList.add("hidden");
      window.location.reload();
    }
  };

  if (loading) return <FetchingState state="Loading..." />;
  if (error) return <FetchingState state={`Error: ${error}`} />;

  return (
    <div className="relative shadow-md mt-0 p-5   ">
      <span className="text-cta-text font-semibold">All Users</span>
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap space-y-4 md:space-y-0 py-4">
        <div>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="inline-flex items-center h-10 text-cta-gray bg-background border border-border focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus:ring-1 focus:border-pear focus:ring-pear "
            type="button"
            onClick={() => router.push(`/admin/user/create`)}
          >
            <FiPlus />
            &nbsp;New User
          </button>
        </div>
        <label htmlFor="table-search" className="sr-only"></label>
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
            className="block p-2 pl-10 text-sm text-cta-text border border-border rounded-lg w-80 bg-background focus:ring-1 focus:ring-pear focus:border-pear placeholder-cta-gray "
            placeholder="Search classes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-cta-text uppercase bg-background">
          <tr>
            <th scope="col" className="p-4" onClick={() => handleSort("id")}>
              No.
            </th>
            <th scope="col" className="p-4">
              Avatar
            </th>
            <th
              className="pl-6 py-3 cursor-pointer"
              onClick={() => handleSort("username")}
            >
              Username{" "}
              {sortKey === "username" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="pl-6 py-3 cursor-pointer"
              onClick={() => handleSort("role")}
            >
              Role {sortKey === "role" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="pl-6 py-3 cursor-pointer "
              onClick={() => handleSort("first_name")}
            >
              First Name
              {sortKey === "first_name" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="pl-6 py-3  cursor-pointer "
              onClick={() => handleSort("last_name")}
            >
              Last Name
              {sortKey === "last_name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="pl-6 py-3 cursor-pointer "
              onClick={() => handleSort("email")}
            >
              Email{" "}
              {sortKey === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>

            <th scope="col" className="px-6 py-3 text-center max-w-12">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedUser.map((user, index) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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

                  {itemsPerPage * (currentPage - 1) + index + 1}
                </div>
              </td>
              <td
                scope="row"
                className=" pl-6 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Image
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                  src={user.avatar != "" && user.avatar ? user.avatar : profile}
                  alt={`${user.username} image`}
                />
              </td>

              <td className="pl-6 py-4 ">
                <div className="pl-3 ">
                  <div className="text-base font-semibold">{user.username}</div>
                  <p className="font-normal text-gray-500 h-auto text-start w-20 md:w-60 truncate">
                    {user.fackbook_name}
                  </p>
                </div>
              </td>
              <td className="pl-6 py-4 ">{user.role}</td>
              <td className="pl-6 py-4 ">{user.first_name}</td>
              <td className="pl-6 py-4 ">{user.last_name}</td>
              <td className="pl-6 py-4 ">{user.email}</td>
              <td className="px-6 py-4 h-full">
                <ActionTable
                  handlePreview={() => handlePreview(user.id)}
                  handleDelete={() => handleDeleteClick(user.id)}
                  handleEdit={() => handleEdit(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        classCount={filteredUsers.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <PreviewUser
        userData={userProfiles.find((cls) => cls.id === previewUser)}
        previewUser={previewUser}
        onEdite={(e) => handleEdit(e)}
        onDelete={(e) => handleDeleteClick(e)}
        setPreviewUser={(e) => setPreviewUser(e)}
      ></PreviewUser>

      <DeleteModle
        handleDeleteConfirm={handleDeleteConfirm}
        setClassToDelete={(e) => setUserToDelete(e)}
      />
    </div>
  );
}
