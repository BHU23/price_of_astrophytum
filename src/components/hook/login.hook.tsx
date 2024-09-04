"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGlobal";
import Cookies from "js-cookie";

export default function useLogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    userProfile,
    setUserProfile,
    toggleIsOpenModelBoolean,
    toggleToken,
    role,
  } = useGlobal();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

      const expirationTimeInDays = 6 / 24;

      await Cookies.set("token", data.token, {
        secure: true,
        expires: expirationTimeInDays,
      });
      await Cookies.set("role", data.user_profile.role, {
        secure: true,
        expires: expirationTimeInDays,
      });

      console.log("token", Cookies.get("token"));

      console.log("user_profile", data.user_profile);

      setUserProfile(data.user_profile);
      console.log("userProfile", userProfile);
      toggleIsOpenModelBoolean(false);
       const role = data.user_profile.role;
       console.log("role", role);
       setTimeout(() => {
         router.push(`/${role?.toLowerCase()}/dashboard`);
       }, 1000);
      
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
