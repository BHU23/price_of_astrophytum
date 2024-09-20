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
