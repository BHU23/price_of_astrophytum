import useSignUp from "../hook/signup.hook";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {
  const { useSignUpItems } = useSignUp();
  const {
    handleChange,
    handleSignUpSubmit,
    showPassword,
    togglePasswordVisibility,
    formData,
  } = useSignUpItems;

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSignUpSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="on"
          placeholder="e.g. userName"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
          [&:not(:placeholder-shown):invalid~span]:block 
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
          focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400
          valid:[&:not(:placeholder-shown)]:border-pear "
          required
          pattern="[0-9a-zA-Z ]{6,}"
        />
        <span className="mt-1 hidden text-sm text-red-400">
          User name must be at least 6 characters long
        </span>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. name@company.com"
          autoComplete="on"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
          [&:not(:placeholder-shown):invalid~span]:block 
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
          focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400
          valid:[&:not(:placeholder-shown)]:border-pear "
          required
          pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <span className="mt-1 hidden text-sm text-red-400">
          Please enter a valid email address.{" "}
        </span>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-pear focus:border-pear 
          [&:not(:placeholder-shown):invalid~span]:block 
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400
          focus:invalid:[&:not(:placeholder-shown)]:border-red-400 focus:invalid:[&:not(:placeholder-shown)]:ring-red-400
          valid:[&:not(:placeholder-shown)]:border-pear "
          autoComplete="off"
          required
          pattern="[0-9a-zA-Z]{8,}"
        />
        <div className="relative">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 -top-12 flex items-center px-3 text-sm font-medium text-gray-900 dark:text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <span className="mt-1 hidden text-sm text-red-400">
          Password must be at least 8 characters.{" "}
        </span>
      </div>

      <button
        type="submit"
        className="w-full text-black bg-pear hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign up
      </button>
    </form>
  );
}
