"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonReturn from "@/components/button_return";
import ButtonItems from "@/components/button_items";
import InputItems from "@/components/input_items";
import FetchingState from "@/components/fetching_state";
import { GetUserProfileByID, UpdateUserProfileByAdmin } from "../hook";

export default function EditProfile({ params }: { params: { user: string } }) {
  const userID = parseInt(params.user, 10);
  const router = useRouter();
  const initialFormData = {
    username: "",
    avatar: "",
    password: "",
    email: "",
    role: "",
    first_name: "",
    last_name: "",
    fackbook_name: "",
  };
 
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await GetUserProfileByID(Number(userID));
        if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData({
            ...formData,
            avatar: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const updatedProfile = await UpdateUserProfileByAdmin(formData,userID);
      if (updatedProfile) {
        // Handle successful update, e.g., notify the user or redirect
        console.log("Profile updated successfully:", updatedProfile);
        router.back();
      }
    } catch (err) {
      console.error("Failed to update user profile:", err);
      setError("Failed to update user profile.");
    } finally {
      setLoading(false);
    }
  };
  const data = [
    { id: 0, name: "Admin" },
    { id: 1, name: "User" },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (loading) {
    return <FetchingState state="Loading..." />;
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5">
      <div className="w-full h-full p-5 gap-5 bg-card rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full text-cta-text flex flex-col gap-5 "
        >
          <div className="w-auto h-full lg:w-[500px]">
            <div>
              <h2 className="text-base font-semibold leading-7 text-cta-text">
                Profile
              </h2>
              <p className="text-sm leading-6 text-cta-gray">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <InputItems
                    id="username"
                    name="Username"
                    type="text"
                    htmlFor="username"
                    placeholder="janesmith"
                    value={formData.username}
                    autoComplete="on"
                    handleChange={handleChange}
                    pattern="[\u0E00-\u0E7Fa-zA-Z0-9' ]{6,}|^'|'$|''"
                    textError="User name must be at least 6 characters long"
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-cta"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      {formData.avatar ? (
                        <Image
                          width={500}
                          height={500}
                          src={formData.avatar ?? ""}
                          alt="Avatar"
                          className="object-cover"
                        />
                      ) : (
                        <svg
                          className="absolute w-12 h-12 text-gray-400 -left-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <button
                      type="button"
                      className="rounded-md bg-pear px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-border focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
                      onClick={() => document.getElementById("avatar")?.click()}
                    >
                      Change
                    </button>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={handleFileUpload}
                      className="sr-only" // Hide the input
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="relative">
                  <label
                    className="text-cta-text text-sm"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                  >
                    Role{" "}
                    <span className="text-red-400 text-start text-sm">*</span>
                    <div
                      id="dropdownActionButton"
                      data-dropdown-toggle="dropdownAction"
                      className={`inline-flex items-center justify-between bg-gray-50 border mt-2 h-10 pr-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
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
                      <span className="sr-only">Select a Role</span>
                      {formData.role ? formData.role : "User"}
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
                      className="z-10 hidden bg-background border border-border divide-y divide-gray-100 rounded-lg shadow w-full mt-1 absolute overflow-hidden"
                    >
                      <ul
                        className="text-sm "
                        aria-labelledby="dropdownActionButton"
                      >
                        {data.map((d) => (
                          <li key={d.id}>
                            <div
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  role: d.name,
                                }));
                                const dropdown =
                                  document.getElementById("dropdownAction");
                                if (dropdown) {
                                  dropdown.classList.add("hidden");
                                }
                              }}
                              className={`block px-4 py-2 w-full text-left hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white ${
                                d.name == formData.role
                                  ? "bg-card text-cta-text"
                                  : "text-gray-700 dark:text-gray-200"
                              }`}
                            >
                              {d.name}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                </div>
              </div>
              <div className="sm:col-span-full">
                <InputItems
                  id="first_name"
                  name="First name"
                  type="text"
                  htmlFor="first_name"
                  placeholder="John"
                  value={formData.first_name}
                  autoComplete="given-name"
                  handleChange={handleChange}
                  pattern="[\u0E00-\u0E7Fa-zA-Z']+"
                  textError="First name must be to text."
                />
              </div>

              <div className="col-span-full">
                <InputItems
                  id="last_name"
                  name="Last name"
                  type="text"
                  htmlFor="last_name"
                  placeholder="Doe"
                  value={formData.last_name}
                  autoComplete="family-name"
                  handleChange={handleChange}
                  pattern="[\u0E00-\u0E7Fa-zA-Z']+"
                  textError="Last name must be to text."
                />
              </div>

              <div className="col-span-full">
                <InputItems
                  id="email"
                  name="Email address"
                  type="email"
                  htmlFor="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  autoComplete="email"
                  handleChange={handleChange}
                  pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  textError=" Please enter a valid email address."
                />
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
        </form>
      </div>
    </div>
  );
}
