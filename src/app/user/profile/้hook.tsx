"use client";

import {
  UserProfileDisplayInterface,
  UserProfileInterface,
} from "@/interface/user.interface";
import Cookies from "js-cookie";
export const GetUserProfile = async () => {
  const apiUrl = `http://127.0.0.1:8000/api/user/profile/`;

  try {
    const token = Cookies.get("token");
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const UpdateUserProfile = async (
  updatedData: Partial<UserProfileInterface>
): Promise<UserProfileInterface | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/user/profile/`;

  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data: UserProfileInterface = await response.json();
    console.log("Updated user data:", data);
    return data;
  } catch (error) {
    console.error("Error updating user data:", error);
    return null;
  }
};
