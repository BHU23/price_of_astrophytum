"use client";

import { useState, useEffect } from "react";

export const useFetchPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) return;

    const fetchPredictions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/predictions/", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

          const data = await response.json();
          console.log("data:", data);
        setPredictions(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  return { predictions, loading, error };
};
