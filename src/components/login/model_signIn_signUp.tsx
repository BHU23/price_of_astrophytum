"use client";
import { useGlobal } from "@/context/useGoble";
import LoginFrom from "./login_from";
import RegisterFrom from "./register_from";
import Logo from "../../../public/logo.png";
import LogoName from "../../../public/LogoName.png";
import { useState } from "react";
import Image from "next/image";
interface ModelSignInSignUp {
  canClose: boolean;
}
export default function ModelSignInSignUp({ canClose }:ModelSignInSignUp) {
  const [activeTab, setActiveTab] = useState("sign-in");
  const { toggleIsOpenModel, isOpen, setIsOpen } = useGlobal();

  return (
    // <div className="flex flex-col items-center justify-center p-5 mx-auto h-full sm:pt-16 pt-14">
    <div className="flex flex-col items-center justify-center p-5 mx-auto h-full">
      <div className="relative w-full rounded-xl shadow border border-border md:mt-0 sm:max-w-md xl:p-0 bg-card">
        {canClose && <div className="absolute  right-0">
          <button
            type="button"
            className=" rounded-md p-2 inline-flex items-center justify-center text-btn hover:text-tan focus:outline-none "
            onClick={toggleIsOpenModel}
          >
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
        </div>}
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
            className="flex flex-wrap mb-2 mr-7 ml-7 list-none rounded-md outline outline-1 outline-offset-8 outline-border "
            data-tabs="tabs"
            role="list"
          >
            <li className="z-30 flex-auto text-center pr-2">
              <a
                onClick={() => setActiveTab("sign-in")}
                className={`z-30 flex items-center justify-center p-2 transition-all ease-in-out border-0 rounded-xl cursor-pointer ${
                  activeTab === "sign-in"
                    ? "bg-tan text-white "
                    : "bg-btn text-black hover:bg-border"
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
                className={`z-30 flex items-center justify-center p-2 mb-0 transition-all ease-in-out border-0 rounded-xl cursor-pointer ${
                  activeTab === "sign-up"
                    ? "bg-tan text-white"
                    : "bg-btn text-black hover:bg-border"
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
          <div className="px-5 pb-6">
            <div className="flex items-center mb-4">
              <hr className="flex-grow h-px bg-gray-200 border-none dark:bg-gray-700" />
              <p className="text-center text-cta-gray px-4">or continue with</p>
              <hr className="flex-grow h-px bg-gray-200 border-none dark:bg-gray-700" />
            </div>
            <div className="flex justify-center space-x-4">
              <button className="bg-btn text-white w-full py-2.5 rounded-md hover:bg-red-700 transition-colors duration-300 flex justify-center items-center">
                <span className="[&>svg]:h-4 [&>svg]:w-4 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 488 512"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </span>{" "}
                Google
              </button>
              <button className="bg-btn text-white  w-full py-2.5 rounded-md hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center">
                <span className="[&>svg]:h-4 [&>svg]:w-4 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </span>{" "}
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
