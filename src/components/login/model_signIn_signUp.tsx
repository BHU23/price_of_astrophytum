"use client";
import { useGlobal } from "@/context/useGoble";
import LoginFrom from "./login_from";
import RegisterFrom from "./register_from";
import Logo from "../../../public/logo.png";
import LogoName from "../../../public/LogoName.png";
import { useState } from "react";
import Image from "next/image";
export default function ModelSignInSignUp() {
  const [activeTab, setActiveTab] = useState("sign-in");
  const { toggleIsOpenModel, isOpen, setIsOpen } = useGlobal();
  
 
  return (
    <div className="flex flex-col items-center justify-center p-5 mx-auto h-full sm:pt-16 pt-14">
      <div className="relative w-full rounded-xl shadow border border-border md:mt-0 sm:max-w-md xl:p-0 bg-card">
        <div className="absolute  right-0">
          <button
            type="button"
            className=" rounded-md p-2 inline-flex items-center justify-center text-btn hover:text-tan focus:outline-none "
            onClick={toggleIsOpenModel}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-5 ">
          <div
            className="flex flex-row items-center h-full justify-center"
            onClick={() => toggleIsOpenModel()}
          >
            <Image
              width={500}
              height={500}
              className="w-auto h-20 "
              src={Logo}
              alt="Logo"
            />
            <Image
              width={500}
              height={500}
              className="w-auto h-20"
              src={LogoName}
              alt=""
            />
          </div>
          <div className="flex font-normal justify-center text-lg pb-5">
            Enter your details
          </div>

          <ul
            className="flex flex-wrap mb-2 mr-5 ml-5 list-none rounded-md outline outline-1 outline-offset-8 outline-border "
            data-tabs="tabs"
            role="list"
          >
            <li className="z-30 flex-auto text-center pr-2">
              <a
                onClick={() => setActiveTab("sign-in")}
                className={`z-30 flex items-center justify-center py-4  transition-all ease-in-out border-0 rounded-xl cursor-pointer ${
                  activeTab === "sign-in"
                    ? "bg-tan text-white "
                    : "bg-btn text-black"
                }`}
                role="tab"
                aria-selected={activeTab === "sign-in"}
                aria-controls="sign-in"
              >
                <span className="ml-1">Sign in</span>
              </a>
            </li>
            <li className="z-30 flex-auto text-center">
              <a
                onClick={() => setActiveTab("sign-up")}
                className={`z-30 flex items-center justify-center  py-4 mb-0 transition-all ease-in-out border-0 rounded-xl cursor-pointer ${
                  activeTab === "sign-up"
                    ? "bg-tan text-white"
                    : "bg-btn text-black"
                }`}
                role="tab"
                aria-selected={activeTab === "sign-up"}
                aria-controls="sign-up"
              >
                <span className="ml-1">Sign up</span>
              </a>
            </li>
          </ul>
          <div data-tab-content="" className="p-5">
            {activeTab === "sign-in" && (
              <div className="block opacity-100" id="sign-in" role="tabpanel">
                {" "}
                <LoginFrom />
              </div>
            )}
            {activeTab === "sign-up" && (
              <div className="block opacity-100" id="sign-up" role="tabpanel">
                <div className="block opacity-100" id="sign-in" role="tabpanel">
                  <RegisterFrom />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
