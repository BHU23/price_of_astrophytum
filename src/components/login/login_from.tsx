
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLogIn from "../hook/login.hook";

export default function LoginFrom() {
  const { useLogInItems } = useLogIn();
  
  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={useLogInItems.handleLoginSubmit}
    >
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
          value={useLogInItems.username}
          onChange={(e) => useLogInItems.setUsername(e.target.value)}
          placeholder="e.g. userName"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            type={useLogInItems.showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={useLogInItems.password}
            onChange={(e) => useLogInItems.setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <button
            type="button"
            onClick={useLogInItems.togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-900 dark:text-white"
          >
            {useLogInItems.showPassword ? <FaEyeSlash /> : <FaEye />}
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


    </form>
  );
}