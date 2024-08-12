import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiFileTextLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiBitCoinLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div className="px-5 py-4 h-full w-full">
      <div className="relative flex h-full w-full max-w-[20rem] flex-col rounded-xl border border-border p-4 ">
        <div className="px-4 pt-2">
          <h5 className="block font-sans text-xs antialiased text-cta">MAIN</h5>
        </div>
        <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal">
          <div
            role="button"
            className="flex items-center w-full p-3 transition-all rounded-lg outline-none text-start text-cta-text hover:text-cta-text bg-card hover:bg-card"
          >
            <div className="grid mr-4 place-items-center">
              <AiOutlineHome />
            </div>
            Dashboard
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 transition-all rounded-lg outline-none text-start text-cta hover:text-cta-text hover:bg-card"
          >
            <div className="grid mr-4 place-items-center">
              <HiOutlineSparkles />
            </div>
            AI
          </div>
          <div
            role="button"
            className="flex justify-between items-center w-full p-3 transition-all rounded-lg outline-none text-start text-cta hover:text-cta-text hover:bg-card"
          >
            <div className="flex ">
              <div className="grid mr-4 place-items-center">
                <RiFileTextLine />
              </div>
              Posts
            </div>
            <p>4</p>
          </div>
        </nav>
        <div className="px-4 pt-2">
          <h5 className="block font-sans text-xs antialiased text-cta">
            SETTING
          </h5>
        </div>
        <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal">
          <div
            role="button"
            className="flex items-center w-full p-3 transition-all rounded-lg outline-none text-start text-cta hover:text-cta-text hover:bg-card"
          >
            <div className="grid mr-4 place-items-center">
              <RiBitCoinLine />
            </div>
            Peice Of Class
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 transition-all rounded-lg outline-none text-start text-cta hover:text-cta-text hover:bg-card"
          >
            <div className="grid mr-4 place-items-center">
              <IoPersonOutline />
            </div>
            Profile
          </div>
        </nav>
        
      </div>
    </div>
  );
};

