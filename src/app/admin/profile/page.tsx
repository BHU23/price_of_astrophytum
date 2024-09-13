"use client";

import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import ButtonPushPathItems from "@/components/button_pushpath_items";
import Line from "@/components/line";
import { useGlobal } from "@/context/useGlobal";
import { useEffect, useState } from "react";
import { GetUserProfile } from "./้hook";
import FetchingState from "@/components/fetching_state";
import Cookies from "js-cookie";
export default function Profile() {
  const { userProfile, setUserProfile } = useGlobal();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchedRole = Cookies.get("role");
    if (fetchedRole) {
      setRole(fetchedRole);
    } else {
      console.warn("Role not found in cookies");
    }
  }, []);
  const handleGetUserProfile = async () => {
    const data = await GetUserProfile();
    setUserProfile(data);
  };

  useEffect(() => {
    handleGetUserProfile();
  }, []);

  if (!userProfile) {
    return <FetchingState state="Loading..." />;
  }
  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5">
      <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden gap-5 bg-card rounded-xl shadow-lg">
        <div className="relative w-full h-72 bg-black dark:bg-white"></div>
        <div className="relative w-full h-full text-cta-text flex flex-col justify-start items-center  gap-5 ">
          <div className="w-full relative h-[95px] md:h-32 lg:h-16 p-0 px-5 md:px-16 ">
            <div className=" w-full absolute -top-20 md:-top-24 flex flex-col lg:flex-row justify-between  lg:pr-[125px] gap-5 ">
              <div className="flex pr-5  lg:pr-0 lg:flex-row item-end gap-5">
                {userProfile.avatar ? (
                  <Image
                    className="w-28 h-28 md:w-40 md:h-40 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={userProfile.avatar ?? ""}
                    alt="Bordered avatar"
                    width={500}
                    height={500}
                  />
                ) : (
                  <svg
                    className="w-28 h-28 md:w-40 md:h-40 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 dark:bg-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
                <div className="flex flex-col justify-end gap-2">
                  <span className="text-lg font-semibold">
                    {" "}
                    {userProfile?.username}
                  </span>
                  <p className=" gap-5 justify-start items-start hidden md:flex">
                    <FaFacebook className="text-2xl"></FaFacebook>{" "}
                    <a href="#" className="hover:text-tan hover:underline">
                      {userProfile?.fackbook_name}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex justify-end items-end pr-10 md:pr-32 lg:pr-0">
                <ButtonPushPathItems
                  name="Edit profile"
                  path={`/admin/profile/edit`}
                ></ButtonPushPathItems>
              </div>
            </div>
          </div>

          <div className="w-full flex p-5 md:p-16 md:pt-0 lg:p-5 pt-0 ">
            <div className="w-full flex flex-col justify-start h-[100%] gap-5 border-t border-border pt-5">
              <div className="flex justify-between gap-5 lg:gap-20 lg:justify-normal">
                <div className="w-1/2 lg:w-auto">
                  <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                    First Name
                  </h5>
                  <p className="mb-4 text-cta-gray text-start dark:text-gray-300">
                    {userProfile?.first_name ?? "-"}
                  </p>
                </div>
                <div className="lg:w-auto w-1/2">
                  {" "}
                  <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                    Last Name
                  </h5>
                  <p className="mb-4 text-cta-gray text-start dark:text-gray-300">
                    {userProfile?.last_name ?? "-"}
                  </p>
                </div>
              </div>
              <div className="w-1/2">
                {" "}
                <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                  Email
                </h5>
                <p className="mb-4 text-cta-gray text-start dark:text-gray-300">
                  {userProfile?.email ?? "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
