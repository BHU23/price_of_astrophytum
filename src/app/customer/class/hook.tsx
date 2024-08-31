"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ClassesInterface } from "@/interface/classes.interface";

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
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setClasses(data);
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
        Authorization: `Token ${token}`,
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
  id: number,
): Promise<ClassesInterface | null> => {

  try {
   const token = Cookies.get("token");
   const apiUrl = `http://127.0.0.1:8000/api/classes/${id}/`;
   const response = await fetch(apiUrl, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Token ${token}`,
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
        Authorization: `Token ${token}`,
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