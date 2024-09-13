import { UserProfileDisplayInterface } from "@/interface/user.interface";
import Image from "next/image";
import profile from "../../public/profile_default_png.png";
interface PreviewUserProps {
  userData: UserProfileDisplayInterface | undefined;
  previewUser: number | null;
  onEdite: (ID: number) => void;
  onDelete: (ID: number) => void;
  setPreviewUser: (ID: number | null) => void;
}

export default function PreviewUser({
  userData,
  previewUser,
  onEdite,
  onDelete,
  setPreviewUser,
}: PreviewUserProps) {
  const handlePreviewCancel = () => {
    setPreviewUser(null);
    const modal = document.getElementById("previewModal");
    if (modal) modal.classList.add("hidden");
  };
  return (
    <div
      id="previewModal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden fixed inset-0 z-[99999] bg-transparent flex justify-center items-center "
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg  shadow-lg dark:bg-card dark:border dark:border-border sm:p-5 shadow-ring-gray  ">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handlePreviewCancel}
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
            <span className="sr-only">Close modal</span>
          </button>
          {previewUser !== null && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center ">
                <Image
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded-full"
                  src={userData?.avatar ?? profile}
                  alt={`${userData?.username} image`}
                />
                <div className="text-start flex flex-col ">
                  <h3 className="text-lg font-semibold  text-gray-900 dark:text-white">
                    {userData?.username}
                  </h3>
                  <p className="text-cta-gray dark:text-gray-300">
                    {userData?.role}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                    First Name
                  </h5>
                  <p className="mb-4 text-cta-gray text-start dark:text-gray-300">
                    {userData?.first_name ?? "-"}
                  </p>
                </div>
                <div className="w-1/2">
                  {" "}
                  <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                    Last Name
                  </h5>
                  <p className="mb-4 text-cta-gray text-start dark:text-gray-300">
                    {userData?.last_name ?? "-"}
                  </p>
                </div>
              </div>
              <div className="w-1/2">
                {" "}
                <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                  Email
                </h5>
                <p className="mb-4 text-cta-gray text-start dark:text-gray-300">
                  {userData?.email ?? "-"}
                </p>
              </div>
              {/* <div className="flex justify-between">
                <div className="w-1/2 rounded-lg overflow-hidden">
                  <Image
                    src={classData?.example_image ?? ""}
                    alt="Preview Image"
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <div className="w-1/2  flex flex-col justify-between">
                  <div className="w-1/2">
                    <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                      Extra Value
                    </h5>
                    <p className="mb-4 text-gray-500 text-start dark:text-gray-300">
                      {classData?.extra_value}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <h5 className="mb-2 font-semibold text-gray-900 text-start dark:text-white">
                      Price
                    </h5>
                    <p className="mb-4 text-gray-500 text-start dark:text-gray-300">
                      {classData?.price.value_min}-{classData?.price.value_max}{" "}
                      ฿
                    </p>
                  </div> 
                </div>
              </div>*/}
            </div>
          )}

          <div className="flex justify-between items-center pt-5">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                className="text-cta-text inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={() => onEdite(userData?.id ?? 0)}
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Edit
              </button>
              <button
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-card dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Preview
              </button>
            </div>
            <button
              type="button"
              className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={() => {
                onDelete(userData?.id ?? 0);
                handlePreviewCancel();
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-1.5 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
