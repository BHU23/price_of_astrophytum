"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiFileTextLine, RiLogoutBoxLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiBitCoinLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { useGlobal } from "@/context/useGlobal";
import Cookies from "js-cookie";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, setIsOpen, toggleToken } = useGlobal();
  const [role, setRole] = useState<string | null>(null);

  // Fetch the role from cookies and set it in the local state
  useEffect(() => {
    const fetchedRole = Cookies.get("role");
    if (fetchedRole) {
      setRole(fetchedRole);
    } else {
      console.warn("Role not found in cookies");
    }
  }, []);

  const getLinkClassName = (path: string) => {
    const isSupPath = pathname.includes(path);
    return `flex items-center w-full p-3 transition-all rounded-lg outline-none text-start ${
      isSupPath
        ? "text-cta-text bg-card"
        : "text-cta hover:text-cta-text hover:bg-card"
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
        // toggleToken(false);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Logout error:", errorData);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="px-5 py-5 sm:py-4 h-full w-full">
      <div className="h-full w-full flex flex-col justify-between rounded-xl border border-border p-4">
        <div className="relative flex h-full w-full max-w-[20rem] flex-col  ">
          <div className="px-4 pt-2">
            <h5 className="block font-sans text-xs antialiased text-cta">
              MAIN
            </h5>
          </div>
          <nav
            className="flex flex-col gap-1 p-2 font-sans text-base font-normal"
            onClick={() => setIsOpen(false)}
          >
            <Link
              href={`/${role?.toLowerCase()}/dashboard`}
              className={getLinkClassName(`/${role?.toLowerCase()}/dashboard`)}
            >
              <div className="grid mr-4 place-items-center">
                <AiOutlineHome />
              </div>
              Dashboard
            </Link>

            <Link
              href={`/${role?.toLowerCase()}/use_ai`}
              className={getLinkClassName(`/${role?.toLowerCase()}/use_ai`)}
            >
              <div className="grid mr-4 place-items-center">
                <HiOutlineSparkles />
              </div>
              AI
            </Link>
            <Link
              href={`/${role?.toLowerCase()}/posts`}
              className={getLinkClassName(`/${role?.toLowerCase()}/posts`)}
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
            {role == "Admin" && (
              <Link
                href={`/${role?.toLowerCase()}/class`}
                className={getLinkClassName(`/${role?.toLowerCase()}/class`)}
              >
                <div className="grid mr-4 place-items-center">
                  <RiBitCoinLine />
                </div>
                Class
              </Link>
            )}
            {/* <Link
            href="/customer/price_of_class"
            className={getLinkClassName("/customer/price_of_class")}
          >
            <div className="grid mr-4 place-items-center">
              <RiBitCoinLine />
            </div>
            Price Of Class
          </Link> */}
            <Link
              href={`/${role?.toLowerCase()}/profile`}
              className={getLinkClassName(`/${role?.toLowerCase()}/profile`)}
            >
              <div className="grid mr-4 place-items-center">
                <IoPersonOutline />
              </div>
              Profile
            </Link>
          </nav>
        </div>
        <div
          className="flex flex-col gap-1 p-2 font-sans text-base font-normal bg-background hover:cursor-pointer"
          onClick={handleLogout}
        >
          <div
            className={`${getLinkClassName(
              "/logout"
            )} focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4`}
          >
            <div className="grid mr-4 place-items-center">
              <RiLogoutBoxLine />
            </div>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
