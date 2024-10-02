import { useGlobal } from "@/context/useGlobal";
import Image from "next/image";
import ButtonReturn from "../button_return";
import { HistoryPromptInterface } from "@/interface/hostoryprompt.interface";
import { PiCopy } from "react-icons/pi";
import { useState } from "react";
export default function ResultPost() {
  const {
    predictionHistoryGlobal,
    loading_prompt,
    setLoadingPrompt,
    historyPrompt,
    setHistoryPrompt,
  } = useGlobal();
  console.log("predictionHistoryGlobalpost", predictionHistoryGlobal);
  console.log("class3", predictionHistoryGlobal.class);
   const [copyStatus, setCopyStatus] = useState("Copy"); 

   const handleCopy = () => {
     navigator.clipboard.writeText(historyPrompt.result); 
     setCopyStatus("Copied!"); 
     setTimeout(() => setCopyStatus("Copy"), 2000); 
   };

  return (
    <div className="w-full flex flex-col justify-start h-[100%] gap-5 ">
      <span className="text-cta-text font-semibold text-sm">
        Result of content.
      </span>
      <div className="h-[1px] bg-cta-gray w-full" />
      <div className="flex flex-col h-full gap-5">
        <div className="flex flex-col gap-2 relative">
          <span className="text-cta-text font-semibold text-sm">Text</span>
          {historyPrompt.result != "" ? (
            <button
              className="absolute top-0 right-0 px-2 text-xs rounded-full hover:text-tan transition-all flex gap-1"
              onClick={handleCopy}
              disabled={loading_prompt}
            >
              <PiCopy size={15} /> {copyStatus}
            </button>) : ("")}
          {loading_prompt ? (
            <div className="min-h-48 h-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear">
              <div className="transition-all text-center text-cta-gray pt-4">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-10 h-10 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#C6ED46"
                  />
                </svg>
                Loading...
              </div>
            </div>
          ) : historyPrompt.result != "" ? (
            <textarea
              id="textarea"
              onChange={(e) =>
                setHistoryPrompt((prev: HistoryPromptInterface) => ({
                  ...prev,
                  result: e.target.value, // Capture the new value from the event
                }))
              }
              value={historyPrompt.result !== "" ? historyPrompt.result : ""} // Empty value if no result is present
              className="min-h-60 h-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear transition-all text-cta-gray"
              style={{ whiteSpace: "pre-wrap" }}
              disabled={loading_prompt} // Disable while loading
              placeholder={
                historyPrompt.result === ""
                  ? "Please Generate"
                  : "Type your text here..."
              }
            />
          ) : (
            <div className="min-h-48 h-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear">
              <div className="transition-all text-center text-cta-gray pt-4">
                Please Generate
              </div>{" "}
            </div>
          )}
        </div>{" "}
        <div className="flex flex-col gap-2">
          <span className="text-cta-text font-semibold text-sm">Image</span>

          <div
            className="flex justify-center h-64 bg-gray-50 border pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
                [&:not(:placeholder-shown):invalid~span]:block 
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
              focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400"
          >
            {predictionHistoryGlobal.image && (
              <Image
                width={500}
                height={500}
                src={predictionHistoryGlobal.image ?? ""}
                alt="Preview"
                className="max-h-full  object-contain"
              />
            )}
          </div>
        </div>
      </div>
      {predictionHistoryGlobal.image && (
        <ButtonReturn
          name={"return"}
          // path={`/${userProfile?.role}/prompt_ai`}
        ></ButtonReturn>
      )}
    </div>
  );
}
