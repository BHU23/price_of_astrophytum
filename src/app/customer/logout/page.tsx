"use client"; // Ensure this is a client component

import React from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/useGoble";
import Cookies from "js-cookie";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { toggleToken } = useGlobal();

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.warn("No token found. User might already be logged out.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        Cookies.remove("token");
        toggleToken(false);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Logout error:", errorData);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
