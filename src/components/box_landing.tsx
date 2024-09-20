"use client"

import { FiAperture } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { PiNoteFill } from "react-icons/pi";
import { useGlobal } from "@/context/useGlobal";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
interface BoxLandingProp {
  Name: string;
  //   Icon: string;
  LinkTo: string;
  Description: string;
}
export default function BoxLanding({
  Name,
  LinkTo,
  Description,
}: BoxLandingProp) {
  
  return (
    <a
      href={LinkTo}
      className="flex flex-col p-3 pb-4 border-2 border-pear rounded-lg h-32  sm:w-44 m-4 gap-3 hover:bg-card"
    >
      <div className="w-full flex flex-row justify-between ">
        <p className="text-cta-text font-medium text-lg">{Name}</p>
        <div className="text-tan flex items-center">
          {Name == "Classification" ? (
            <FiAperture></FiAperture>
          ) : Name == "Prompt" ? (
            <PiNoteFill></PiNoteFill>
          ) : Name == "Posts" ? (
            <FaFacebook></FaFacebook>
          ) : (
            <></>
          )}
        </div>
      </div>
      <p className="text-cta leading-tight">{Description}</p>
    </a>
  );
}
