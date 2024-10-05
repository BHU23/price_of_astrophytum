import Cookies from "js-cookie";
import {
  PromptfromInterface,
  HistoryPromptInterface,
} from "@/interface/hostoryprompt.interface";

export const PostHistoryPrompt = async (
  historyPrompt: PromptfromInterface
): Promise<HistoryPromptInterface[] | null> => {
  const apiUrl = "http://127.0.0.1:8000/api/history-prompts/";
  try {
    const token = Cookies.get("token");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(historyPrompt),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Network response was not ok: ${
          errorData.message || response.statusText
        }`
      );
    }

    // On successful submission
    const data = await response.json();
    console.log("History prompt successfully submitted:", data);
    return data.history_prompt;
  } catch (error) {
    console.error("Error submitting history prompt:", error);
    return null;
  }
};

export const DeleteHistoryPrompt = async (id: string): Promise<boolean> => {
  const apiUrl = `http://127.0.0.1:8000/api/history-prompts/${id}/`;
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
      throw new Error(`Error deleting history prompt: ${response.statusText}`);
    }

    return true; // Return true on successful deletion
  } catch (error) {
    console.error(`Error deleting history prompt with ID ${id}:`, error);
    return false;
  }
};

export const UpdateHistoryPrompt = async (
  id: string,
  updatedPrompt: PromptfromInterface
): Promise<HistoryPromptInterface | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/history-prompts/${id}/`;
  try {
    const token = Cookies.get("token");
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPrompt),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error updating history prompt: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error(`Error updating history prompt with ID ${id}:`, error);
    return null;
  }
};

export const GetHistoryPromptById = async (
  id: string
): Promise<HistoryPromptInterface | null> => {
  const apiUrl = `http://127.0.0.1:8000/api/history-prompts/${id}/`;
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
      throw new Error(`Error fetching history prompt: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("history prompt ",data);
    return data
  } catch (error) {
    console.error(`Error fetching history prompt with ID ${id}:`, error);
    return null;
  }
};
 

export const GetHistoryPrompts = async (): Promise<
  HistoryPromptInterface[] | null
> => {
  const apiUrl = "http://127.0.0.1:8000/api/history-prompts/";
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
      throw new Error(`Error fetching history prompts: ${response.statusText}`);
    }

    const data = await response.json();
     console.log("history prompt ", data);
    return data;
  } catch (error) {
    console.error("Error fetching history prompts:", error);
    return null;
  }
};
