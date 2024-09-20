"use client";

import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useFetchPredictions = () => {
  const [historyPredictions, setHistoryPredictions] = useState<
    HistoryPredicstionInterface[] | null
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistoryPredictions = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "http://127.0.0.1:8000/api/history-predictions/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data:", data);
      console.log("data.user:", data[0].user);
      setHistoryPredictions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryPredictions(); // Initial fetch

    const interval = setInterval(() => {
      fetchHistoryPredictions(); // Fetch every 30 seconds
    }, 30000); // 30000 milliseconds = 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return { historyPredictions, loading, error };
};

export const DeleteHistoryPredictionByID = async (hisID: string): Promise<boolean> => {
  const apiUrl = `http://127.0.0.1:8000/api/history-predictions/${hisID}/`;

  try {
    // Get the authentication token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
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

    console.log(`Deleted class with ID: ${hisID}`);
    return true;
  } catch (error) {
    console.error("Error deleting class:", hisID);
    return false;
  }
};
