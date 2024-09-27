import { StyleInterface } from "@/interface/hostoryprompt.interface";
import Cookies from "js-cookie";
export const ListStyles = async (): Promise<StyleInterface[] | null> => {
  const apiUrl = "http://127.0.0.1:8000/api/styles/";

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
      const errorData = await response.json();
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data: StyleInterface[] = await response.json();
    console.log("Fetched styles data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching styles data:", error);
    return null;
  }
};
