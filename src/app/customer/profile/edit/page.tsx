"use client";
import React, { useState } from "react";


export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    facebook: "",
    avatar: ""
  });

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
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   const { name, value } = event.target;
  //   if (files) {
  //     setFormData({
  //     ...formData,
  //     [name]: files,
  //   });
  // };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          console.log("reader.result: " + reader.result);
          setFormData({
            ...formData,
            avatar: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }

  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5">
      <div className="w-full h-full p-5 gap-5 bg-card rounded-xl">
        <form className="w-full h-full text-cta-text flex flex-col gap-5 ">
          <div>
            <form>
              <div>
                <div >
                  <h2 className="text-base font-semibold leading-7 text-cta">Profile</h2>
                  <p className="text-sm leading-6 text-cta-gray">
                    This information will be displayed publicly so be careful what you share.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <label htmlFor="username" className="block text-sm font-medium leading-6 text-cta">
                        Username
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                          <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="janesmith"
                            autoComplete="username"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>


                    <div className="col-span-full">

                      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-cta">
                        Photo
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                          <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                        {/* <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" /> */}
                        <button
                          type="button"
                          className="rounded-md bg-pear px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 "
                        >
                          Change
                        </button>
                      </div>
                    </div>


                  </div>
                </div>

                <div className="border-b border-gray-900/10 dark:border-gray-700 pb-12">

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-full">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-cta">
                        First name
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                          <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="mix"
                            autoComplete="username"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-cta">
                        Last name
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                          <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="kenton"
                            autoComplete="username"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-cta">
                        Email address
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                          <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="name@company.com"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-cta placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-cta">
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
        </form>
      </div>
    </div>
  );
}
