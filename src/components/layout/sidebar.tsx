"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiFileTextLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiBitCoinLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { useGlobal } from "@/context/useGoble";

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useGlobal();
  const getLinkClassName = (path: string) => {
    const isSupPath = pathname.includes(path);
    return `flex items-center w-full p-3 transition-all rounded-lg outline-none text-start ${
      isSupPath
        ? "text-cta-text bg-card"
        : "text-cta hover:text-cta-text hover:bg-card"
    }`;
  };

  return (
    <div className="px-5 py-5 sm:py-4 h-full w-full">
      <div className="relative flex h-full w-full max-w-[20rem] flex-col rounded-xl border border-border p-4 ">
        <div className="px-4 pt-2">
          <h5 className="block font-sans text-xs antialiased text-cta">MAIN</h5>
        </div>
        <nav
          className="flex flex-col gap-1 p-2 font-sans text-base font-normal"
          onClick={() => setIsOpen(false)}
        >
          <Link
            href="/customer/dashboard"
            className={getLinkClassName("/customer/dashboard")}
          >
            <div className="grid mr-4 place-items-center">
              <AiOutlineHome />
            </div>
            Dashboard
          </Link>
          <Link
            href="/customer/use_ai"
            className={getLinkClassName("/customer/use_ai")}
          >
            <div className="grid mr-4 place-items-center">
              <HiOutlineSparkles />
            </div>
            AI
          </Link>
          <Link
            href="/customer/posts"
            className={getLinkClassName("/customer/posts")}
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
            href="/customer/price_of_class"
            className={getLinkClassName("/customer/price_of_class")}
          >
            <div className="grid mr-4 place-items-center">
              <RiBitCoinLine />
            </div>
            Price Of Class
          </Link>
          <Link
            href="/customer/profile"
            className={getLinkClassName("/customer/profile")}
          >
            <div className="grid mr-4 place-items-center">
              <IoPersonOutline />
            </div>
            Profile
          </Link>
        </nav>
      </div>
    </div>
  );
}
