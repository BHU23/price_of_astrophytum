import ButtonItems from "../button_items";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import LogoName from "../../../public/LogoName.png";
import { useState } from "react";
import { DropdownRoles } from "../dropdown_roles";
import { DropdownStyles } from "../dropdown_style";
import { useGlobal } from "@/context/useGlobal";
import {
  HistoryPromptInterface,
  HistoryPromptfromInterface,
} from "@/interface/hostoryprompt.interface";
import InputNumber from "../input_number";

export default function SettingPrompt() {
  const { predictionHistoryGlobal, loading_prompt } = useGlobal();

  const [historyPrompt, setHistoryPrompt] =
    useState<HistoryPromptfromInterface>({
      prompt: "",
      result: "",
      image: predictionHistoryGlobal?.image ?? "",
      price:
        (predictionHistoryGlobal.total_min ??
          0 + predictionHistoryGlobal.total_max ??
          0) / 2,
      user: 1,
      history_predictions: predictionHistoryGlobal,
      role: null,
      style: null,
    });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setHistoryPrompt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("History Prompt Submitted:", historyPrompt);
  };

  const maxLength = 500;

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-auto lg:min-h-[calc(100vh-6rem)] w-full lg:min-w-[350px] lg:w-[350px] lg:h-auto p-5 pt-2 bg-card text-cta-text rounded-lg shadow-lg">
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
              value={historyPrompt.prompt}
              placeholder="Enter description"
              onChange={handleInputChange}
              rows={4}
              maxLength={maxLength}
              required
            ></textarea>
            <div className="flex justify-between lg:flex-wrap text-sm text-gray-500">
              <span>
                {historyPrompt.prompt.length}/{maxLength} characters
              </span>
              {historyPrompt.prompt.length === maxLength && (
                <span className="text-red-400">Maximum characters reached</span>
              )}
            </div>
          </div>
          <div className="h-[1px] bg-cta-gray w-full" />
          <div className="flex flex-col gap-2">
            <label className="text-cta-text font-semibold text-sm flex">
              Type <span className="text-red-400 text-start text-sm"> *</span>
            </label>
            <div className="min-h-16 bg-gray-50 border pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear">
              <p>Test</p>
            </div>
          </div>
          <InputNumber
            id="price"
            autoComplete=""
            name="price" // Change to match state
            value={String(historyPrompt.price)} // Ensure value is a string
            htmlFor="price" // Ensure it matches the id
            type="number"
            placeholder="e.g. 60.5"
            handleChange={(e) => {
              const parsedPrice = e.target.value
                ? parseFloat(e.target.value)
                : 0; // Parse to float
              setHistoryPrompt((prev) => ({
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
              role={historyPrompt.role}
              setRole={(e) => {
                setHistoryPrompt((prev) => ({
                  ...prev,
                  role: e,
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
              style={historyPrompt.style}
              setStyle={(e) => {
                setHistoryPrompt((prev) => ({
                  ...prev,
                  style: e,
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
      </div>
    </form>
  );
}
