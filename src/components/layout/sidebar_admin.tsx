"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiFileTextLine, RiLogoutBoxLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiBitCoinLine } from "react-icons/ri";
import { IoPeople, IoPersonOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useGlobal } from "@/context/useGlobal";
import Image from "next/image";
import profile from "../../../public/profile_default_png.png";
import LogOutModle from "../logOut_model";
interface SidebarAdminProps {
  setIsOpenSM: () => void; // พารามิเตอร์คือฟังก์ชันไม่มีพารามิเตอร์คืนค่า void
}

export default function SidebarAdmin({ setIsOpenSM }: SidebarAdminProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile } = useGlobal();
  const getLinkClassName = (path: string) => {
    const isSupPath = pathname.includes(path);
    return `flex items-center w-full p-3 transition-all rounded-lg outline-none text-start ${
      isSupPath
        ? "text-cta-text bg-card shadow-lg  dark:shadow- "
        : "text-cta hover:text-cta-text hover:bg-card hover:shadow-lg"
    }`;
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.warn("No token found. User might already be logged out.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        Cookies.remove("token");
        Cookies.remove("role");
        setTimeout(() => {
          router.push("/");
        }, 100);

        // window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Logout error:", errorData);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);
  const handleLogoutOpen = () => {
    setLogOutModalOpen(true);
  };

  // Handler to close logout modal
  const handleLogoutClose = () => {
    setLogOutModalOpen(false);
  };

  return (
    <div className="px-5 py-5 sm:py-4 h-full w-full">
      <div className="h-full w-full flex flex-col justify-between rounded-xl border border-border p-2 ">
        <div className="relative flex h-full w-full max-w-[20rem] flex-col  ">
          <div className="px-4 pt-2">
            <h5 className="block font-sans text-xs antialiased text-cta ">
              MAIN
            </h5>
          </div>
          <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal">
            <Link
              href={`/admin/dashboard`}
              className={getLinkClassName(`/admin/dashboard`)}
              onClick={setIsOpenSM}
            >
              <div className="grid mr-4 place-items-center">
                <AiOutlineHome />
              </div>
              Dashboard
            </Link>

            <Link
              href={`/admin/use_ai`}
              className={getLinkClassName(`/admin/use_ai`)}
              onClick={setIsOpenSM}
            >
              <div className="grid mr-4 place-items-center">
                <HiOutlineSparkles />
              </div>
              AI
            </Link>
            <Link
              href={`/admin/posts`}
              className={getLinkClassName(`/admin/posts`)}
              onClick={setIsOpenSM}
            >
              <div className="flex justify-between items-center w-full transition-all rounded-lg outline-none text-start">
                <div className="flex ">
                  <div className="grid mr-4 place-items-center">
                    <RiFileTextLine />
                  </div>
                  Posts
                </div>
                <p>4</p>
              </div>
            </Link>
          </nav>
          <div className="px-4 pt-2">
            <h5 className="block font-sans text-xs antialiased text-cta">
              SETTING
            </h5>
          </div>
          <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal">
            <Link
              href={`/admin/class`}
              className={getLinkClassName(`/admin/class`)}
              onClick={setIsOpenSM}
            >
              <div className="grid mr-4 place-items-center">
                <RiBitCoinLine />
              </div>
              Class
            </Link>

            <Link
              href={`/admin/user`}
              className={getLinkClassName(`/admin/user`)}
              onClick={setIsOpenSM}
            >
              <div className="grid mr-4 place-items-center">
                <IoPeople />
              </div>
              Uers
            </Link>
            <Link
              href={`/admin/profile`}
              className={getLinkClassName(`/admin/profile`)}
              onClick={setIsOpenSM}
            >
              <div className="grid mr-4 place-items-center">
                <IoPersonOutline />
              </div>
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-1 p-2 font-sans text-base font-normal hover:cursor-pointer">
          <div
            className={`${getLinkClassName(
              "/logout"
            )} justify-between px-0 py-0 focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4`}
          >
            <Link
              className="flex items-center gap-2 font-medium dark:text-white p-3 pr-0"
              href={`/admin/profile`}
              onClick={setIsOpenSM}
            >
              <Image
                width={50}
                height={50}
                className="w-10 h-10 rounded-full"
                src={userProfile?.avatar ?? profile}
                alt=""
              ></Image>
              <div className="font-medium dark:text-white ">
                <div>{userProfile?.username}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {userProfile?.role}
                </div>
              </div>
            </Link>
            <div
              className="h-full grid place-items-center px-2 hover:bg-pear"
              onClick={handleLogout}
            >
              <RiLogoutBoxLine />
            </div>
          </div>
        </div>
      </div>
      {isLogOutModalOpen && (
        <LogOutModle
          handlelogOutConfirm={handleLogout}
          handleClose={handleLogoutClose}
        />
      )}
    </div>
  );
}
