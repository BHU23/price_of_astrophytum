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
