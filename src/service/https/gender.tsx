import { GenderInterface } from "@/interface/user.interface";
import Cookies from "js-cookie";

export const ListGenders = async (): Promise<GenderInterface[] | null> => {
  const apiUrl = "http://127.0.0.1:8000/api/genders/";
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
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data: GenderInterface[] = await response.json();
    console.log("Fetched roles data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching roles data:", error);
    return null;
  }
};

export const GetGenderById = async (id: number): Promise<string | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/genders/${id}/`;
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Token not found, please log in.");
      return null;
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

    const data: GenderInterface = await response.json();
    console.log(`Fetched gender data for ID ${id}:`, data);
    return data.name;
  } catch (error) {
    console.error(`Error fetching gender data for ID ${id}:`, error);
    return null;
  }
};
