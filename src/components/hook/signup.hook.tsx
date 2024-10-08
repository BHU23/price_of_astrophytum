"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGlobal";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export default function useSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserProfile, toggleIsOpenModelBoolean, toggleToken, role } =
    useGlobal();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (
    //   e.target.name == "email" &&
    //   e.target.value &&
    //   !e.target.value.includes("@")
    // ) {
    //   const emailValue = e.target.value + "@gmail.com";
    //   setFormData({ ...formData, email: emailValue });
    // } else {

    // }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("formData handleChange", formData);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        const expirationTimeInDays = 6 / 24;

        Cookies.set("token", data.access, {
          secure: true,
          expires: expirationTimeInDays,
        });
        Cookies.set("role", data.user_profile.role, {
          secure: true,
          expires: expirationTimeInDays,
        });

        console.log("token", Cookies.get("token"));
        console.log("data.user_profile", data.user_profile);
        setUserProfile(data.user_profile);

        toggleIsOpenModelBoolean(false);

        const role = data.user_profile.role;
        console.log("role", role);

        // เพิ่ม toast สำหรับการสมัครสำเร็จ
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          router.push(`/${role?.toLowerCase()}/dashboard`);
        }, 100);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        console.error("An error occurred:", errorData);
        // เพิ่ม toast สำหรับข้อผิดพลาด
        if (errorData.username) {
          toast.error(`Username error: ${errorData.username[0]}`, {
            position: "top-right",
            autoClose: 5000,
          });
        }

        if (errorData.email) {
          toast.error(`Email error: ${errorData.email[0]}`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred during registration.");

      // เพิ่ม toast สำหรับข้อผิดพลาดทั่วไป
      toast.error("An error occurred during registration.", {
        position: "top-right",
        autoClose: 2500,
      });
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return {
    useSignUpItems: {
      handleChange,
      formData,
      handleSignUpSubmit,
      showPassword,
      togglePasswordVisibility,
    },
  };
}
