"use client";
import React, { useState } from 'react';

export default function BoxLogin() {

  const [activeTab, setActiveTab] = useState('sign-in');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  }
    return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5 ">

            <div className="flex flex-row items-center h-full justify-center">


              <img
                className="w-auto h-20 "
                src={
                  "https://img2.pic.in.th/pic/Minimalist_Mascot_Camera_Logo-removebg-preview2c.png"
                }
                alt="Logo"
              />
              <img
                className="w-auto h-20"
                src={
                  "https://img5.pic.in.th/file/secure-sv1/Remove-bg.ai_172319125922822.png"
                }
                alt=""
              />


            </div>
            <div className='flex font-normal justify-center text-lg pb-5'>Enter your details</div>

            <ul
              className="flex flex-wrap mb-2 mr-5 ml-5 list-none rounded-md outline outline-1 outline-offset-8 outline-border "
              data-tabs="tabs"
              role="list"
            >
              <li className="z-30 flex-auto text-center pr-2">
                <a
                  onClick={() => setActiveTab('sign-in')}
                  className={`z-30 flex items-center justify-center py-4  transition-all ease-in-out border-0 rounded-xl cursor-pointer ${activeTab === 'sign-in'
                    ? 'bg-tan text-white '
                    : 'bg-btn text-black'
                    }`}
                  role="tab"
                  aria-selected={activeTab === 'sign-in'}
                  aria-controls="sign-in"
                >
                  <span className="ml-1">Sign in</span>
                </a>
              </li>
              <li className="z-30 flex-auto text-center">
                <a
                  onClick={() => setActiveTab('sign-up')}
                  className={`z-30 flex items-center justify-center  py-4 mb-0 transition-all ease-in-out border-0 rounded-xl cursor-pointer ${activeTab === 'sign-up' ?
                    'bg-tan text-white'
                    : 'bg-btn text-black'
                    }`}
                  role="tab"
                  aria-selected={activeTab === 'sign-up'}
                  aria-controls="sign-up"
                >
                  <span className="ml-1">Sign up</span>
                </a>
              </li>
            </ul>
            <div data-tab-content="" className="p-5">
              {activeTab === 'sign-in' && (
                <div className="block opacity-100" id="sign-in" role="tabpanel">

                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-black bg-pear hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>

                    <div className="mt-6">
                      <div className="flex items-center mb-4">
                        <hr className="flex-grow h-px bg-gray-200 border-none dark:bg-gray-700" />
                        <p className="text-center text-cta-gray px-4">or continue with</p>
                        <hr className="flex-grow h-px bg-gray-200 border-none dark:bg-gray-700" />
                      </div>
                      <div className="flex justify-center space-x-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center">
                          <span className="[&>svg]:h-4 [&>svg]:w-4 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 320 512">
                              <path
                                d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                            </svg>
                          </span> Facebook
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center">
                          <span className="[&>svg]:h-4 [&>svg]:w-4 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 488 512">
                              <path
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                          </span> Google
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
              )}
              {activeTab === 'sign-up' && (
                <div className="block opacity-100" id="sign-up" role="tabpanel">
                  <div className="block opacity-100" id="sign-in" role="tabpanel">


                    <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="yourname"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your name
                        </label>
                        <input
                          type="yourname"
                          name="yourname"
                          id="yourname"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Mix Kenton"
                          required
                        />
                      </div>
                      <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                      <button
                        type="submit"
                        className="w-full text-black bg-pear hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Sign up
                      </button>

                      <div className="mt-6">
                      <div className="flex items-center mb-4">
                        <hr className="flex-grow h-px bg-gray-200 border-none dark:bg-gray-700" />
                        <p className="text-center text-cta-gray px-4">or continue with</p>
                        <hr className="flex-grow h-px bg-gray-200 border-none dark:bg-gray-700" />
                      </div>
                        <div className="flex justify-center space-x-4">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center">
                            <span className="[&>svg]:h-4 [&>svg]:w-4 mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 320 512">
                                <path
                                  d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                              </svg>
                            </span> Facebook
                          </button>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center">
                            <span className="[&>svg]:h-4 [&>svg]:w-4 mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 488 512">
                                <path
                                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                              </svg>
                            </span> Google
                          </button>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
              )}
            </div>



          </div>
        </div>
      </div >


    );
  }
