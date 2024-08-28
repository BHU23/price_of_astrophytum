"use client";
import React, { useEffect, useState } from "react";
import { GetUserProfile, UpdateUserProfile } from "../้hook";
import Image from "next/image";

export default function EditProfile() {
  const initialFormData = {
    username: "",
    avatar: "",
    password: "",
    email: "",
    role: "", // Assuming role is handled separately
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
        const data = await GetUserProfile();
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
      const updatedProfile = await UpdateUserProfile(formData);
      if (updatedProfile) {
        // Handle successful update, e.g., notify the user or redirect
        console.log("Profile updated successfully:", updatedProfile);
      }
    } catch (err) {
      console.error("Failed to update user profile:", err);
      setError("Failed to update user profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5">
      <div className="w-full h-full p-5 gap-5 bg-card rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full text-cta-text flex flex-col gap-5 "
        >
          <div>
            <h2 className="text-base font-semibold leading-7 text-cta">
              Profile
            </h2>
            <p className="text-sm leading-6 text-cta-gray">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-cta"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      value={formData.username}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
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
                        src={formData.avatar}
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
                    className="rounded-md bg-pear px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300"
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

          <div className="border-b border-gray-900/10 dark:border-gray-700 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-cta"
                >
                  First name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="John"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-cta"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Doe"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-cta"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-cta"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
