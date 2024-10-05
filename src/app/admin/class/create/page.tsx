"use client";

import ButtonItems from "@/components/button_items";
import useCreateClass from "./hook";
import { FiPlus } from "react-icons/fi";
import InputItems from "@/components/input_items";
import Image from "next/image";
import ButtonReturn from "@/components/button_return";
import FetchingState from "@/components/fetching_state";
import { useEffect, useRef, useState } from "react";
import InputNumber from "@/components/input_number";
export default function CreateClass() {
  const {
    useClassItems: {
      handleInputChange,
      handleCreataClass,
      newPriceState,
      setNewPriceState,
      formDataClass,
      setFormDataClass,
      prices,
    },
    loading,
    error,
  } = useCreateClass();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate that the file is an image
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(file.type)) {
        console.error("Invalid file type. Please upload an image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormDataClass((prev: any) => ({
            ...prev,
            example_image: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };


  if (loading) return <FetchingState state="Loading..." /> ;
  if (error) return <FetchingState state={`Error: ${error}`} />;

  return (
    <form
      className="flex flex-col w-full h-full pt-0 gap-5"
      onSubmit={handleCreataClass}
    >
      <div className="flex flex-col w-full h-full shadow-md  rounded-b-xl mt-0 p-5  bg-card text-cta-text  gap-5 ">
        <div className="w-auto h-full lg:w-[500px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-cta-text font-semibold">Create Class</span>
              <span className="text-cta-gray text-sm">
                This information will be displayed publicly so be careful what
                you share.
              </span>
            </div>
            <InputItems
              id="name"
              name="Name"
              type="text"
              autoComplete="off"
              value={formDataClass.name}
              htmlFor="name"
              placeholder="Enter class name"
              handleChange={handleInputChange}
              pattern="[a-zA-Z!@#$%^&*\_\- ]{1,}"
              textError='Class name must be at least 1 characters long and "!@#$%^&*_-" in EN language.'
            />
            {!formDataClass.example_image ? (
              <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
                <label
                  htmlFor="example_image_input"
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm tes">
                      <span className="font-semibold text-pear">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-cta-gray">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  {/* <input
                    id="example_image_upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                    value={formDataClass.example_image}
                    
                  /> */}
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
                <Image
                  width={500}
                  height={500}
                  src={formDataClass.example_image}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label
                className="text-cta-text font-semibold text-sm"
                htmlFor="example_image_input"
              >
                Upload new Image{" "}
                <span className="text-red-400 text-start text-sm">*</span>
              </label>
              <input
                className="block w-full h-10 pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer file:p-2 file:font-semibold file:bg-gray-600 file:h-full file:rounded-md file:border-0  file:text-pear file:text-sm file:mr-2 dark:hover:text-white  focus:ring-pear focus:outline-none focus:z-10 focus:ring-1"
                id="example_image_input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-cta-text font-semibold text-sm"
                htmlFor="description"
              >
                Description{" "}
                <span className="text-red-400 text-start text-sm">*</span>
              </label>
              <textarea
                // className="block w-full h-auto pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer p-2 font-semibold bg-card mr-2 dark:hover:text-white  hover:bg-ring_gray   dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
                className="bg-gray-50 border pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
                [&:not(:placeholder-shown):invalid~span]:block 
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
              focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400"
                id="description"
                name="description"
                autoComplete="off"
                value={formDataClass.description}
                placeholder="Enter description"
                onChange={handleInputChange}
                rows={4}
                required
                maxLength={500}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-cta-text font-semibold text-sm"
                htmlFor="description"
              >
                Care Instructions
                <span className="text-red-400 text-start text-sm">*</span>
              </label>
              <textarea
                // className="block w-full h-auto pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer p-2 font-semibold bg-card mr-2 dark:hover:text-white  hover:bg-ring_gray   dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
                className="bg-gray-50 border pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
                [&:not(:placeholder-shown):invalid~span]:block 
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
              focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400"
                id="care_instructions"
                name="care_instructions"
                autoComplete="off"
                value={formDataClass.care_instructions}
                placeholder="Enter care instructions"
                onChange={handleInputChange}
                rows={4}
                required
                maxLength={500}
              ></textarea>
            </div>
            <InputNumber
              id="extra_value"
              autoComplete=""
              name={"Extra Value (฿): "}
              value={String(formDataClass.extra_value) ?? "0"}
              htmlFor={"extra_value"}
              type={"number"}
              placeholder="e.g. 60.5"
              handleChange={handleInputChange}
              pattern="^\d+(\.\d{2})?$"
              min="0"
              step="0.01"
              textError="Please enter a valid price."
            ></InputNumber>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between flex-row gap-2">
                <label
                  className="text-cta-text font-semibold text-sm gap-5 w-1/2"
                  htmlFor="price_range"
                >
                  Value (฿):
                </label>
                <div
                  onClick={() => setNewPriceState(!newPriceState)}
                  className="flex items-center justify-center  h-6 cursor-pointer transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md w-6  hover:text-tan md:my-0 dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
                >
                  {!newPriceState ? (
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
                </div>
              </div>

              {!newPriceState ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    id="dropdownActionButton"
                    data-dropdown-toggle="dropdownAction"
                    className={`inline-flex items-center justify-between bg-gray-50 border mt-2 h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                      isDropdownOpen ? "ring-1 ring-pear" : ""
                    }`}
                    typeof="button"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      const dropdown =
                        document.getElementById("dropdownAction");
                      if (dropdown) {
                        dropdown.classList.toggle("hidden");
                      }
                    }}
                  >
                    <span className="sr-only">Select a price</span>
                    {formDataClass.price.value_min
                      ? `${formDataClass.price.value_min} - ${formDataClass.price.value_max}`
                      : "Select a price"}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l4 4 4-4"
                      />
                    </svg>
                  </div>

                  {/* Dropdown menu */}
                  <div
                    id="dropdownAction"
                    className="z-10 hidden bg-background border border-border divide-y divide-gray-100 rounded-lg shadow w-full mt-1 absolute h-40 overflow-y-scroll"
                  >
                    <ul
                      className="text-sm "
                      aria-labelledby="dropdownActionButton"
                    >
                      {prices.map((price) => (
                        <li key={price.id}>
                          <div
                            onClick={() => {
                              setFormDataClass((prev) => ({
                                ...prev,
                                price: {
                                  id: price.id,
                                  value_min: price.value_min,
                                  value_max: price.value_max,
                                },
                              }));
                              const dropdown =
                                document.getElementById("dropdownAction");
                              if (dropdown) {
                                dropdown.classList.add("hidden");
                              }
                            }}
                            className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                              price.id == formDataClass.price.id
                                ? "bg-card text-cta-text"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {price.value_min} - {price.value_max}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between gap-5">
                  <InputNumber
                    id="value_min"
                    name="value_min"
                    type="number"
                    autoComplete="off"
                    value={String(formDataClass.price.value_min)}
                    htmlFor="value_min"
                    placeholder="Enter minimum price"
                    handleChange={(e) =>
                      setFormDataClass((prev) => ({
                        ...prev,
                        price: {
                          ...prev.price,
                          value_min: Number(e.target.value),
                        },
                      }))
                    }
                    pattern="^\d+(\.\d{2})?$"
                    min="0"
                    step="0.01"
                    textError="Please enter a valid price."
                  />
                  <InputNumber
                    id="value_max"
                    name="value_max"
                    type="number"
                    autoComplete="off"
                    value={String(formDataClass.price.value_max)}
                    htmlFor="value_max"
                    placeholder="Enter maximum price"
                    handleChange={(e) =>
                      setFormDataClass((prev) => ({
                        ...prev,
                        price: {
                          ...prev.price,
                          value_max: Number(e.target.value),
                        },
                      }))
                    }
                    pattern="^\d+(\.\d{2})?$"
                    min="0"
                    step="0.01"
                    textError="Please enter a valid price."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-900/10 dark:border-gray-700 pt-12">
          <div className="mt-1 flex items-center justify-end gap-x-6">
            <ButtonReturn name={"Cancel"}></ButtonReturn>
            <ButtonItems
              name={"Save"}
              onClick={() => {}}
              type="submit"
              withs="28"
              loading={false}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
