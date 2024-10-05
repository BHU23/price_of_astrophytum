"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  ClassesInterface,
  UpdateClassesInterface,
} from "@/interface/classes.interface";
import { PriceInterface } from "@/interface/prices.interface";

export function useClasses() {
  const [classes, setClasses] = useState<ClassesInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = Cookies.get("token");
        const apiUrl = `http://127.0.0.1:8000/api/classes/`;
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

        const data = await response.json();
        setClasses(data);
        console.log("class:", data);
      } catch (err) {
        setError("Error fetching classes" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { classes, loading, error };
}

export const UpdateClass = async (
  classId: number,
  updatedClassData: Partial<ClassesInterface>
): Promise<ClassesInterface | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/classes/${classId}/`;

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
      body: JSON.stringify(updatedClassData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data: ClassesInterface = await response.json();
    console.log("Updated class data:", data);
    return data;
  } catch (error) {
    console.error("Error updating class data:", error);
    return null;
  }
};
export const GetClass = async (
  id: number
): Promise<ClassesInterface | null> => {
  try {
    const token = Cookies.get("token");
    const apiUrl = `http://127.0.0.1:8000/api/classes/${id}/`;
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

    const data: ClassesInterface = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating class data:", error);
    return null;
  }
};

export const GetPrice = async () => {
  const apiUrl = `http://127.0.0.1:8000/api/prices/`;

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

export const createPrice = async (
  newPriceData: Partial<PriceInterface>
): Promise<PriceInterface | null> => {
  const apiUrl = "http://127.0.0.1:8000/api/prices/";

  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPriceData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data: PriceInterface = await response.json();
    console.log("Created price data:", data);
    return data;
  } catch (error) {
    console.error("Error creating price data:", error);
    return null;
  }
};

export const CreateClass = async (
  newClassData: Partial<ClassesInterface>
): Promise<ClassesInterface | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/classes/`;

  try {
    // Get the authentication token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Using Token-based authentication
      },
      body: JSON.stringify(newClassData), // Sending the new class data
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data: ClassesInterface = await response.json();
    console.log("Created new class data:", data);
    return data;
  } catch (error) {
    console.error("Error creating class data:", error);
    return null;
  }
};

export const DeleteClassByID = async (classID: string): Promise<boolean> => {
  const apiUrl = `http://127.0.0.1:8000/api/classes/${classID}/`;

  try {
    // Get the authentication token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Using Token-based authentication
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    console.log(`Deleted class with ID: ${classID}`);
    return true;
  } catch (error) {
    console.error("Error deleting class:", error);
    return false;
  }
};
