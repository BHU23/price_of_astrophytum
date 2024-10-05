"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  UserProfileDisplayInterface,
  UserProfileInterface,
} from "@/interface/user.interface";

export function useUserProfile() {
  // Handle an array of user profiles
  const [userProfiles, setUserProfiles] = useState<
    UserProfileDisplayInterface[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const token = Cookies.get("token");
        const apiUrl = `http://127.0.0.1:8000/api/profiles/`;

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: UserProfileDisplayInterface[] = await response.json();
        setUserProfiles(data);
        console.log("User profiles:", data);
      } catch (err) {
        setError("Error fetching user profiles: ");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfiles();
  }, []);

  return { userProfiles, loading, error };
}

// Create a new user profile
export const CreateUserProfile = async (
  newProfileData: Partial<UserProfileInterface>
): Promise<UserProfileInterface | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/profile/create/`;

  try {
    const token = Cookies.get("token");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProfileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    const data: UserProfileInterface = await response.json();
    console.log("Created new user profile:", data);
    return data;
  } catch (error) {
    console.error("Error creating user profile:", error);
    return null;
  }
};

export const DeleteUserProfileByID = async (id: number): Promise<boolean> => {
  const apiUrl = `http://127.0.0.1:8000/api/profile/${id}/`;

  try {
    const token = Cookies.get("token");
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    console.log(`Deleted user profile with ID: ${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting user profile:", error);
    return false;
  }
};

export const GetUserProfileByID = async (id: number) => {
  const apiUrl = `http://127.0.0.1:8000/api/profile/${id}/`;

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
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const UpdateUserProfileByAdmin = async (
  updatedData: Partial<UserProfileInterface>,
  id: number
): Promise<UserProfileInterface | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/profile/${id}/`;

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
