"use client";
import React, { useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    facebook: "",
    avatar: ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileUpload  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          console.log("reader.result: " + reader.result);
         setFormData({
        ...formData,
        avatar: reader.result,
      });
        }
      };
      reader.readAsDataURL(file);
    }
      
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5">
      <div className="flex justify-center items-center w-full h-full p-5 gap-5 bg-card rounded-xl">
        <form className="w-full lg:w-[350px] h-full text-cta-text flex flex-col justify-start items-center  gap-5 ">
          <div className="space-y-12"></div>
        </form>
      </div>
    </div>
  );
}
