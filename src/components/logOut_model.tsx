import { FaUserLock } from "react-icons/fa6";

interface logOutModleProps {
  handlelogOutConfirm: () => void;
  handleClose: () => void;
}

export default function LogOutModle({
  handlelogOutConfirm,
  handleClose,
}: logOutModleProps) {
  return (
    <div
      id="deleteModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 inset-y-1/3 z-[9999] bg-transparent flex justify-center items-center "
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow-lg dark:bg-card dark:border dark:border-border sm:p-5 shadow-ring-gray  ">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Cancel</span>
          </button>
          <FaUserLock className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"></FaUserLock>
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to Logout?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={handleClose}
            >
              No, cancel
            </button>
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={handlelogOutConfirm}
            >
              Yes, I&apos;m sure.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
