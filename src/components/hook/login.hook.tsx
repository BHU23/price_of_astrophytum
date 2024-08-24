"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGoble";

export default function useLogIn(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { userProfile, setUserProfile, toggleIsOpenModel, toggleToken } =
    useGlobal();
  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("token", data.token);
      console.log("token", localStorage.getItem("token"));

      console.log("user_profile", data.user_profile);

      setUserProfile(data.user_profile);
      console.log("userProfile", userProfile);

      toggleIsOpenModel();
      
      
      router.push("/dashboard");
      toggleToken(true);
    } else {
      const errorData = await response.json();
      setError(errorData.error);
    }
  };
  const [activeTab, setActiveTab] = useState("sign-in");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return {
    useLogInItems: {
      username,
      setUsername,
      password,
      setPassword,
      error,
      setError,
      handleLoginSubmit,
      activeTab,
      setActiveTab,
      showPassword,
      setShowPassword,
      togglePasswordVisibility,
    },
  };
}