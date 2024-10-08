"use client";
import { HistoryPredicstionInterface } from "@/interface/historyPredictions.interface";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HistoryPromptInterface } from "@/interface/hostoryprompt.interface";
import { GetHistoryPrompts } from "@/service/https/promp";
import { toast } from "react-toastify";

export const useFetchPredictions = () => {
  const [historyPredictions, setHistoryPredictions] = useState<
    HistoryPredicstionInterface[] | null
  >([]);
  const [historyPrompts, setHistoryPrompts] = useState<
    HistoryPromptInterface[] | null
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistoryPredictions = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          "http://127.0.0.1:8000/api/history-predictions/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
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

    const fetchHistoryPrompts = async () => {
      try {
        const historyPrompts = await GetHistoryPrompts();
        if (historyPrompts) {
          setHistoryPrompts(historyPrompts);
          console.log("Fetched history prompts:", historyPrompts);
        }
      } catch (error) {
        console.error("Error fetching history prompts:", error);
      }
    };

    fetchHistoryPredictions();
    fetchHistoryPrompts();
  }, []);

  return { historyPredictions, historyPrompts, loading, error };
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

    console.log(`Deleted class with ID: ${hisID}`);
    return true;
  } catch (error) {
    console.error("Error deleting class:", hisID);
    toast.error(`Failed to delete class with ID: ${hisID}`, {
      position: "top-right",
      autoClose: 5000,
    });
    return false;
  }
};
