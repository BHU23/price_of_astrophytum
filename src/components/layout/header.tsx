"use client";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import { useGlobal } from "@/context/useGlobal";
import ModelSignInSignUp from "../login/model_signIn_signUp";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import LogoName from "../../../public/LogoName.png";

export default function Header() {
  const {
    token,
    isOpenModel,
    toggleIsOpenModel,
    isOpen,
    setIsOpen,
    breadcrumbLinks,
  } = useGlobal();

  return (
    <div>
      <nav className="w-full fixed bg-card shadow z-[999]">
        <div className="py-1 pl-2 flex justify-between items-center">
          <div className="flex flex-row items-center justify-between">
            {breadcrumbLinks.length > 0 && (
              <div className="flex sm:hidden gap-2">
                <button
                  onClick={() => setIsOpen((prev: boolean) => !prev)}
                  type="button"
                  className="flex items-center justify-center my-2 transition-colors duration-300 transform text-cta-text hover:border border-border rounded-md w-8 h-8 hover:text-tan ml-3 mr-1 md:my-0"
                  aria-label="toggle menu"
                >
                  {isOpen ? (
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
            )}
            <a href="/">
              <Image
                width={500}
                height={500}
                className="w-auto h-12 sm:h-14"
                src={Logo}
                alt="Logo"
              />
            </a>
            <a href="/">
              <Image
                width={500}
                height={500}
                className="w-auto h-12 sm:h-14"
                src={LogoName}
                alt="Logo Name"
              />
            </a>
          </div>

          <div className="flex items-center justify-center">
            {token == null && (
              <div
                onClick={toggleIsOpenModel}
                className="flex items-center justify-center cursor-pointer my-2 transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md w-18 h-8 px-5 hover:text-tan md:my-0"
              >
                <p>Sign in/up</p>
              </div>
            )}
            <div className="flex items-center justify-center cursor-pointer my-2 transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md w-8 h-8 hover:text-tan ml-1 mr-5 md:my-0">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </nav>

      {isOpenModel && (
        <div className="fixed h-full w-full bg-transparent z-[9999]">
          <ModelSignInSignUp canClose={true} />
        </div>
      )}
    </div>
  );
}
