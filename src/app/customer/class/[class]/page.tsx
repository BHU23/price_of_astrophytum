"use client";

import ButtonItems from "@/components/button_items";
import useClass from "./hook";
import { FiPlus } from "react-icons/fi";
import InputItems from "@/components/input_items";
import Image from "next/image";
import ButtonReturn from "@/components/button_return";

export default function Class({ params }: { params: { class: string } }) {
  const classId = parseInt(params.class, 10);

  const {
    useClassItems: {
      handleFileChange,
      handleInputChange,
      handlePriceChange,
      handleUpdate,
      newPriceState,
      setNewPriceState,
      formDataClass,
      setFormDataClass,
      prices,
    },
    loading,
    error,
  } = useClass(classId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form
      className="flex flex-col w-full h-full p-5 pt-0 gap-5"
      onSubmit={handleUpdate}
    >
      <div className="flex flex-col w-full h-full p-5 bg-card text-cta-text rounded-lg gap-5 ">
        <div className="w-auto h-full lg:w-[500px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-cta-text font-semibold">
                Editing Class {formDataClass.name}
              </span>
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
            />
            <div>
              {!formDataClass.example_image ? (
                <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
                  <label
                    htmlFor="dropzone-file"
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
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange} // No value attribute
                      accept="image/*"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
                  <Image
                    width={500}
                    height={500}
                    src={formDataClass.example_image ?? ""}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-cta-text font-semibold text-sm"
                htmlFor="small_size"
              >
                Upload new Image
              </label>
              <input
                className="block w-full h-10 pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer file:p-2 file:font-semibold file:h-full file:rounded-md file:border-0 file:bg-gray-800 file:text-pear file:text-sm file:mr-2 dark:hover:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
                id="small_size"
                type="file"
                accept="image/*"
                onChange={handleFileChange} // No value attribute
              ></input>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-cta-text font-semibold text-sm"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="block w-full h-auto pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer p-2 font-semibold bg-card mr-2 dark:hover:text-white  hover:bg-ring_gray   dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
                id="description"
                name="description"
                autoComplete="off"
                value={formDataClass.description}
                placeholder="Enter description"
                onChange={handleInputChange}
                rows={4}
              ></textarea>
            </div>
            <InputItems
              id="extra_value"
              autoComplete=""
              name={"Extra Value (฿):"}
              value={String(formDataClass.extra_value) ?? "0"}
              htmlFor={"extra_value"}
              type={"number"}
              placeholder="e.g. 60.5"
              handleChange={handleInputChange}
            ></InputItems>
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
              {/* <select
                className="block w-full h-10 p-1 text-sm text-cta-text border bg-card border-border rounded-lg cursor-pointer placeholder-gray-400 hover:bg-ring_gray focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
                value={`${formDataClass.price.value_min} - ${formDataClass.price.value_max}`}
                onChange={handlePriceChange}
                id="price"
              >
                <option value="" disabled>
                  Select a price
                </option>
                {prices.map((price) => (
                  <option
                    key={price.id}
                    value={`${price.value_min} - ${price.value_max}`}
                  >
                    {price.value_min} - {price.value_max}
                  </option>
                ))}
              </select> */}
              {!newPriceState ? (
                <div className="relative">
                  <div
                    id="dropdownActionButton"
                    data-dropdown-toggle="dropdownAction"
                    className="inline-flex items-center justify-between w-full h-10 p-2 text-sm text-cta-text border bg-card border-border rounded-lg cursor-pointer placeholder-gray-400 hover:bg-ring_gray focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
                    // type="button"
                    onClick={() => {
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
                    className="z-10 hidden bg-background border border-border divide-y divide-gray-100 rounded-lg shadow w-full mt-1 absolute"
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
                            className={`block px-4 py-2 w-full text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
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
                  <InputItems
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
                  />
                  <InputItems
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
            />
          </div>
        </div>
      </div>
    </form>
  );
}
