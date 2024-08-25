"use client";
import React, { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import useHeader from "./hook/header.hook";
import { useGlobal } from "@/context/useGoble";
import ModelSignInSignUp from "./login/model_signIn_signUp";
export default function Header() {
  const { headerItems } = useHeader();
  const { token,isOpenModel,toggleIsOpenModel } = useGlobal();

  return (
    <div>
      <nav className="w-full fixed bg-card shadow ">
        <div className=" py-1 pl-2 flex justify-between items-center">
          {/* <div className=" py-1 md:flex md:justify-between md:items-center"> */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex sm:hidden gap-2">
              <button
                onClick={() => headerItems.setIsOpen(!headerItems.isOpen)}
                type="button"
                className="flex items-center justify-center  my-2 transition-colors duration-300 transform text-cta-text hover:border border-border rounded-md w-8 h-8  hover:text-tan ml-3 mr-1 md:my-0"
                aria-label="toggle menu"
              >
                {headerItems.isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <a href="/">
              <img
                className="w-auto h-12 sm:h-14"
                src={
                  "https://img2.pic.in.th/pic/Minimalist_Mascot_Camera_Logo-removebg-preview2c.png"
                }
                alt="Logo"
              />
            </a>
            <a href="/">
              <img
                className="w-auto h-12 sm:h-14"
                src={
                  "https://img5.pic.in.th/file/secure-sv1/Remove-bg.ai_172319125922822.png"
                }
                alt=""
              />
            </a>
          </div>

          <div className="flex items-center justify-center ">
            {!token ? (
              <div
                onClick={() => toggleIsOpenModel()}
                className="flex items-center justify-center cursor-pointer my-2 transition-colors duration-300 transform text-cta-text hover:border border-border rounded-md w-18 h-8 px-5 hover:text-tan md:my-0"
              >
                <div>Sign in/up</div>
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center justify-center cursor-pointer  my-2 transition-colors duration-300 transform text-cta-text hover:border border-border rounded-md w-8 h-8  hover:text-tan ml-1 mr-5 md:my-0">
              <ThemeSwitch />
            </div>
          </div>
          {/* <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-card md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          > */}
          {/* <div className="flex flex-col md:flex-row md:mx-6">
              <a
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="/"
              >
                HOME
              </a>
              <a
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="../use_ai"
              >
                USE AI
              </a>
              <a
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#"
              >
                Contact
              </a>
              <a
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#"
              >
                About
              </a>
            </div> */}
          {/* <div className="flex flex-col md:flex-row ">
              <a
                className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
              </a> */}
          {/* <div className="my-2 transition-colors duration-300 transform text-cta-text  hover:text-tan md:mx-4 md:my-0">
                <ThemeSwitch />
              </div>  
            </div>
          </div>*/}
        </div>
      </nav>
      {isOpenModel && (
        <div className="fixed h-full w-full bg-transparent">
          <ModelSignInSignUp />
        </div>
      )}
    </div>
  );
}
