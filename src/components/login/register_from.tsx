import useSignUp from "../hook/signup.hook";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputItems from "../input_items";

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
        <InputItems
          id="username"
          name="Username"
          type="text"
          htmlFor="username"
          placeholder="UserName"
          value={formData.username}
          autoComplete="on"
          handleChange={handleChange}
          pattern="[\u0E00-\u0E7Fa-zA-Z0-9' ]{6,}|^'|'$|''"
          textError="User name must be at least 6 characters long"
        />
      </div>
      <div>
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

      <div>
        <div>
          <div className="relative top-0">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-[52px] flex items-center px-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <InputItems
            id="password"
            name="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            value={formData.password}
            htmlFor="Password"
            placeholder="••••••••"
            handleChange={handleChange}
            pattern="[0-9a-zA-Z]{8,}"
            textError=" Password must be at least 8 characters."
          />
        </div>
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
