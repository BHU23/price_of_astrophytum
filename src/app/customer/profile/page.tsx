"use client";

import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import ButtonPushPathItems from "@/components/button_pushpath_items";
import Line from "@/components/line";
import { useGlobal } from "@/context/useGoble";
import { useEffect } from "react";
import { GetUserProfile } from "./้hook";
export default function Profile() {
  const { userProfile, setUserProfile } = useGlobal();
  const handleGetUserProfile = async () => {
    const data = await GetUserProfile();
    setUserProfile(data);
  };

  useEffect(() => {
    handleGetUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5">
      <div className="flex justify-center items-center w-full h-full p-5 gap-5 bg-card rounded-xl">
        <div className="w-full lg:w-[350px] h-full text-cta-text flex flex-col justify-start items-center  gap-5 ">
          <Image
            className="w-64 h-64 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src={userProfile.avatar}
            alt="Bordered avatar"
            width={500}
            height={500}
          />
          <p className="text-lg font-semibold"> {userProfile.username}</p>
          <p className=" flex gap-5">
            <FaFacebook className="text-2xl"></FaFacebook>{" "}
            <a href="#" className="hover:text-tan hover:underline">
              {userProfile.fackbook_name}
            </a>
          </p>
          <ButtonPushPathItems
            name="Edit profile"
            path="/customer/profile/edit"
          ></ButtonPushPathItems>

          <div className="w-full flex flex-col justify-start h-[100%] gap-5">
            <div className="w-full flex flex-col px-5 py-1 rounded-lg border border-border bg-background hover:bg-gray-50 dark:hover:bg-gray-600 ">
              <div className="w-full flex flex-row justify-between h-10 items-center py-5 ">
                <p>FristName</p>
                <span>{userProfile.first_name}</span>
              </div>
              <Line />
              <div className="w-full flex flex-row justify-between h-10 items-center py-5">
                <p>LastName</p>
                <span>{userProfile.last_name}</span>
              </div>
            </div>

            <div className="w-full flex flex-col px-5 py-1 rounded-lg border border-border bg-background hover:bg-gray-50 dark:hover:bg-gray-600 ">
              <div className="w-full flex flex-row justify-between h-10 items-center py-5 ">
                <p>Password</p>
                <span>********</span>
              </div>
            </div>
            <div className="w-full flex flex-col px-5 py-1 rounded-lg border border-border bg-background hover:bg-gray-50 dark:hover:bg-gray-600 ">
              <div className="w-full flex flex-row justify-between h-10 items-center py-5">
                <p>Facbook</p>
                <span> {userProfile.fackbook_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
