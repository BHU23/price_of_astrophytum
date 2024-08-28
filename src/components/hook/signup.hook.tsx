"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGoble";
import Cookies from "js-cookie";
export default function useSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserProfile, toggleIsOpenModel, toggleToken } = useGlobal();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
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

        // Handle successful registration
        Cookies.set("token", data.token, { secure: true });

        console.log("token", Cookies.get("token"));
        console.log("data.user_profile", data.user_profile);
        setUserProfile(data.user_profile);

        toggleIsOpenModel();
        router.push("/customer/dashboard");
        toggleToken(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred during registration.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return {
    useSignUpItems: {
      handleChange,
      handleSignUpSubmit,
      showPassword,
      togglePasswordVisibility,
    },
  };
}
