import { RoleInterface } from "@/interface/hostoryprompt.interface";
import Cookies from "js-cookie";

export const ListRoles = async (): Promise<RoleInterface[] | null> => {
  const apiUrl = "http://127.0.0.1:8000/api/roles/";
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

    const data: RoleInterface[] = await response.json();
    console.log("Fetched roles data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching roles data:", error);
    return null;
  }
};
