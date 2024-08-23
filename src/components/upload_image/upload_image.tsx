import { FiCamera, FiXCircle } from "react-icons/fi";
import ButtonUpload from "../button_upload";
import ButtonReload from "../button_reload";
import useUploadImage from "../hook/upload_image.hook";

export default function UploadImage() {

  const { uploadImageItem } = useUploadImage();


  return (
    <div className="w-full lg:min-w-[350px] lg:w-[350px] h-full p-5 pt-2 bg-card text-cta-text rounded-lg">
      <div className="pr-2 flex flex-row items-center justify-center">
        <img
          className="w-auto h-20"
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
      <div className="flex flex-col gap-5 pt-2">
        <span className="text-cta-text font-semibold text-sm">
          Add new image of Nudum
        </span>
        <div>
          {uploadImageItem.videoStatus ? (
            <div className="flex relative flex-col items-center justify-center w-full h-auto border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
              <video
                ref={uploadImageItem.videoRef}
                className="w-full h-full"
                autoPlay
                muted
              />
              <canvas ref={uploadImageItem.canvasRef} className="hidden" />
              <button
                onClick={uploadImageItem.closeCamera}
                className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
              >
                <FiXCircle />
              </button>
              <button
                type="button"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
                onClick={uploadImageItem.captureImage}
                onMouseEnter={uploadImageItem.handleMouseEnter}
                onMouseLeave={uploadImageItem.handleMouseLeave}
                aria-label="Capture Image"
              >
                <FiCamera className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                <span className="sr-only">Capture image</span>
              </button>
              {uploadImageItem.isTooltipVisible && (
                <div
                  role="tooltip"
                  className="absolute z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                  style={{
                    bottom: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  Take a photo
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              )}
            </div>
          ) : !uploadImageItem.imagePreview && !uploadImageItem.videoStatus ? (
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
                  onChange={uploadImageItem.handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
              <img
                src={uploadImageItem.imagePreview ?? ""}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="h-[1px] bg-cta-gray w-full" />
          <span className="text-cta-gray text-sm">or</span>
          <div className="h-[1px] bg-cta-gray w-full" />
        </div>

        <label
          className="text-cta-text font-semibold text-sm"
          htmlFor="small_size"
        >
          Import from URL
        </label>
        <ButtonReload
          name={"Reload"}
          handleFileChange={uploadImageItem.handleFileChange}
        />
        <div className="flex flex-row gap-5 items-center justify-center w-full">
          <button
            onClick={uploadImageItem.openCamera}
            className="w-full py-3 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer flex items-center justify-center"
          >
            <FiCamera />
          </button>
        </div>
        <ButtonUpload name={"Upload"} onClick={uploadImageItem.handleUpload} />
      </div>
    </div>
  );
}