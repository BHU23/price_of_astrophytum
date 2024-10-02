import ButtonItems from "../button_items";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import LogoName from "../../../public/LogoName.png";
import { useEffect, useState } from "react";
import { DropdownRoles } from "../dropdown_roles";
import { DropdownStyles } from "../dropdown_style";
import { useGlobal } from "@/context/useGlobal";
import {
  HistoryPromptInterface,
  PromptfromInterface,
} from "@/interface/hostoryprompt.interface";
import InputNumber from "../input_number";
import { ClassesInterface } from "@/interface/classes.interface";
import { FiPlus, FiX } from "react-icons/fi";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";
import { PostHistoryPrompt } from "@/service/https/promp";

export default function SettingPrompt() {
  const {
    predictionHistoryGlobal,
    loading_prompt,
    setLoadingPrompt,
    historyPrompt,
    setHistoryPrompt,
  } = useGlobal();
  console.log("eeee", predictionHistoryGlobal);
  const maxLength = 500;
  const [predictionHistory, setPredictionHistory] =
    useState<PredictionHistorysInterface>(predictionHistoryGlobal);
  const [newClassState, setNewClassState] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [prompt, setPrompt] =
    useState<PromptfromInterface>({
      prompt: "",
      result: "",
      classes: [],
      image: predictionHistory?.image ?? "",
      price:
        ((predictionHistory.total_min ?? 0 )+ (predictionHistory.total_max ?? 0)) /
        2,
      history_prediction_id: predictionHistory.id,
      role_id: null,
      style_id: null,
    });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPrompt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("History Prompt Submitted:", prompt);
    setLoadingPrompt(true);
    try {
      const response = await PostHistoryPrompt(prompt);
      console.log("History Prompt posted successfully.", response);
      if (response) {
        setHistoryPrompt(response);
      } else {
        console.error("Response is null");
        setHistoryPrompt((prev: HistoryPromptInterface) => ({
          ...prev, // Optional: spread previous state if you're preserving values
          prompt: "",
          result: "",
          classes: [],
          image: "",
          price: 0,
          user_profile: null,
          history_predictions: null,
          role: null,
          style: null,
        }));

      }
       setLoadingPrompt(false);
    } catch (error) {
      console.error("Error submitting history prompt:", error);
      setLoadingPrompt(false);
    }
  };

  useEffect(() => {
    setPredictionHistory(predictionHistoryGlobal);
    setPrompt((prev: PromptfromInterface) => ({
      ...prev,
      image: predictionHistory?.image ?? "",
      price:
        ((predictionHistory.total_min ?? 0) +
          (predictionHistory.total_max ?? 0)) /
        2,
      history_prediction_id: predictionHistory.id,
    }));
    if (Array.isArray(predictionHistory?.class)) {
      setPrompt((prev: PromptfromInterface) => ({
        ...prev,
        classes: predictionHistory?.class.map((item) => item.name),
      }));
    }
  }, [predictionHistory, predictionHistoryGlobal]);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto lg:min-h-[calc(100vh-6rem)] w-full lg:min-w-[350px] lg:w-[350px] lg:h-auto p-5 pt-2 bg-card text-cta-text rounded-lg shadow-lg"
    >
      <div className="pr-2 flex flex-row items-center justify-center">
        <Image
          width={500}
          height={500}
          className="w-auto h-20"
          src={Logo}
          alt="Logo"
        />
        <Image
          width={500}
          height={500}
          className="w-auto h-20"
          src={LogoName}
          alt="Logo Name"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            className="text-cta-text font-semibold text-sm flex"
            htmlFor="prompt" // Use appropriate id
          >
            Add your message
            <span className="text-red-400 text-start text-sm"> *</span>
          </label>
          <textarea
            className="bg-gray-50 border pr-2 min-h-10 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
                [&:not(:placeholder-shown):invalid~span]:block 
                invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
                focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400"
            id="prompt"
            name="prompt"
            autoComplete="off"
            value={prompt.prompt}
            placeholder="Enter description"
            onChange={handleInputChange}
            rows={4}
            maxLength={maxLength}
            required
          ></textarea>
          <div className="flex justify-between lg:flex-wrap text-sm text-gray-500">
            <span>
              {prompt.prompt.length}/{maxLength} characters
            </span>
            {prompt.prompt.length === maxLength && (
              <span className="text-red-400">Maximum characters reached</span>
            )}
          </div>{" "}
        </div>
      </div>
      <div className="h-[1px] bg-cta-gray w-full my-4" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between gap-2">
            <label className="text-cta-text font-semibold text-sm flex">
              Type <span className="text-red-400 text-start text-sm"> *</span>
            </label>
            <div
              onClick={() => setNewClassState(!newClassState)}
              className="flex items-center justify-center  h-6 cursor-pointer transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md w-6  hover:text-tan md:my-0 dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
            >
              {!newClassState ? (
                <FiPlus></FiPlus>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>{" "}
          </div>
          {newClassState && (
            <div className="relative">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update state when input changes
                className="bg-gray-50 font-normal border h-10 pr-4 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear"
                placeholder="Enter a class"
              />
              <div
                onClick={() => {
                  if (inputValue.trim()) {
                    setPrompt((prev: PromptfromInterface) => ({
                      ...prev,
                      classes: [...(prev.classes || []), inputValue],
                    }));
                    setInputValue("");
                  }
                }}
                className="absolute top-0 right-0 flex items-center justify-center  h-10 w-10 cursor-pointer transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md  hover:text-tan md:my-0 dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
              >
                <FiPlus />
              </div>
            </div>
          )}
          <div className="min-h-16 bg-gray-50 border pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear">
            <div className="flex flex-wrap gap-3">
              {" "}
              {prompt?.classes &&
                Array.isArray(prompt.classes) &&
                prompt.classes.map((e: String, index: number) => (
                  <div
                    key={index}
                    className="relative inline-flex items-center justify-between p-2 pr-3 mt-1 text-sm font-medium text-cta-text rounded-lg min-w-24 w-auto h-10 text-center border border-border"
                  >
                    <div
                      onClick={() => {
                        // Safely remove the class at the current index
                        setPrompt((prev: PromptfromInterface) => ({
                          ...prev,
                          classes: prompt?.classes.filter(
                            (_, i) => i !== index
                          ),
                        }));
                      }}
                      className="absolute -top-1 -right-2 p-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                    >
                      <FiX />
                    </div>
                    {e}
                  </div>
                ))}
            </div>{" "}
          </div>
        </div>
        <InputNumber
          id="price"
          autoComplete=""
          name="price" // Change to match state
          value={String(prompt.price)} // Ensure value is a string
          htmlFor="price" // Ensure it matches the id
          type="number"
          placeholder="e.g. 60.5"
          handleChange={(e) => {
            const parsedPrice = e.target.value ? parseFloat(e.target.value) : 0; // Parse to float
            setPrompt((prev) => ({
              ...prev,
              price: parsedPrice,
            }));
          }}
          pattern="^\d+(\.\d{2})?$"
          min="0"
          step="0.01"
          textError="Please enter a valid price."
        />
        <div className="flex flex-col gap-2">
          <label
            className="text-cta-text font-semibold text-sm flex"
            htmlFor="role" // Use appropriate id
          >
            Role
            <span className="text-red-400 text-start text-sm">*</span>
          </label>
          <DropdownRoles
            role={prompt.role_id}
            setRole={(e) => {
              setPrompt((prev) => ({
                ...prev,
                role_id: e,
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-cta-text font-semibold text-sm flex"
            htmlFor="style" // Use appropriate id
          >
            Styles
            <span className="text-red-400 text-start text-sm">*</span>
          </label>
          <DropdownStyles
            style={prompt.style_id}
            setStyle={(e) => {
              setPrompt((prev) => ({
                ...prev,
                style_id: e,
              }));
            }}
          />
        </div>
        <ButtonItems
          name="Generate"
          onClick={() => {}}
          type="submit"
          withs="full"
          loading={loading_prompt}
        />
      </div>
    </form>
  );
}
