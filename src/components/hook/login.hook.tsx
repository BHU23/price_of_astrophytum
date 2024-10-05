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
  const { setUserProfile, toggleIsOpenModelBoolean, toggleToken } =
    useGlobal();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await PostLogIn(username, password);

      const expirationTimeInDays = 6 / 24; 
      console.log("loginData",data)
      Cookies.set("token", data.access, {
        secure: true,
        expires: expirationTimeInDays,
      });
      Cookies.set("role", data.user_profile.role, {
        secure: true,
        expires: expirationTimeInDays,
      });

      setUserProfile(data.user_profile);
      toggleIsOpenModelBoolean(false);

      // toggleToken(true);

      setTimeout(() => {
        router.push(`/${data.user_profile.role.toLowerCase()}/dashboard`);
      }, 100);
    } catch (error) {
      setError(
        "An unexpected error occurred. Please try again."
      );
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

export async function PostLogIn(username: string, password: string) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

