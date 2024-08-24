"use client";
import { useGlobal } from "@/context/useGoble";
import LoginFrom from "./login_from";
import RegisterFrom from "./register_from";

import { useState } from "react";
export default function ModelSignInSignUp() {
  const [activeTab, setActiveTab] = useState("sign-in");
  const { toggleIsOpenModel } = useGlobal();
  return (
    <div className="flex flex-col items-center justify-center p-5 mx-auto h-full sm:pt-16 pt-14">
      <div className="w-full rounded-xl shadow border border-border md:mt-0 sm:max-w-md xl:p-0 bg-card">
        <div className="p-5 ">
          <div
            className="flex flex-row items-center h-full justify-center"
            onClick={() => toggleIsOpenModel()}
          >
            <img
              className="w-auto h-20 "
              src={
                "https://img2.pic.in.th/pic/Minimalist_Mascot_Camera_Logo-removebg-preview2c.png"
              }
              alt="Logo"
            />
            <img
              className="w-auto h-20"
              src={
                "https://img5.pic.in.th/file/secure-sv1/Remove-bg.ai_172319125922822.png"
              }
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
