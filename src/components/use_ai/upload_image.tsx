import { FiCamera, FiXCircle } from "react-icons/fi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import ButtonItems from "../button_items";
import ButtonReload from "./button_reload";
import useFormUploadImage from "../hook/form_upload_image.hook";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import LogoName from "../../../public/LogoName.png";
import { useState } from "react";
export default function UploadImage() {
  const { useFormUploadImageItem } = useFormUploadImage();
  
  return (
    <div className="  h-auto lg:min-h-[calc(100vh-6rem)] w-full lg:min-w-[350px] lg:w-[350px] h-full p-5 pt-2 bg-card text-cta-text rounded-lg shadow-lg">
      <div className="pr-2 flex flex-row items-center justify-center">
        <Image
          width={500}
          height={500}
          className="w-auto h-20 "
          src={Logo}
          alt="Logo"
        />
        <Image
          width={500}
          height={500}
          className="w-auto h-20"
          src={LogoName}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-cta-text font-semibold text-sm">
          Add new image of Nudum
        </span>
        <div>
          {useFormUploadImageItem.videoStatus ? (
            <div className="flex relative flex-col items-center justify-center w-full h-auto border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border overflow-hidden">
              <video
                ref={useFormUploadImageItem.videoRef}
                className="w-full h-full"
                autoPlay
                muted
              />
              <canvas
                ref={useFormUploadImageItem.canvasRef}
                className="hidden"
              />
              <button
                onClick={useFormUploadImageItem.closeCamera}
                className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
              >
                <FiXCircle />
              </button>
              <button
                type="button"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
                onClick={useFormUploadImageItem.captureImage}
                onMouseEnter={useFormUploadImageItem.handleMouseEnter}
                onMouseLeave={useFormUploadImageItem.handleMouseLeave}
                aria-label="Capture Image"
              >
                <FiCamera className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                <span className="sr-only">Capture image</span>
              </button>
              {useFormUploadImageItem.isTooltipVisible && (
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
          ) : !useFormUploadImageItem.imagePreview &&
            !useFormUploadImageItem.videoStatus ? (
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
                {/* <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={useFormUploadImageItem.handleFileChange}
                  accept="image/*"
                /> */}
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
              <Image
                width={500}
                height={500}
                src={useFormUploadImageItem.imagePreview ?? ""}
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
          className="text-cta-text font-semibold text-sm flex "
          htmlFor="dropzone-file"
        >
          Import your Nudum image{" "}
          <span className="text-red-400 text-start text-sm">*</span>
        </label>
        <ButtonReload
          name={"Reload"}
          isShow={useFormUploadImageItem.isShow}
          handleFileChange={useFormUploadImageItem.handleFileChange}
        />

        <div className="flex flex-row gap-5 items-center justify-between w-full">
          <button
            onClick={useFormUploadImageItem.openCamera}
            className={`${
              useFormUploadImageItem.imagePreview ? "w-1/2 " : "w-full"
            } py-3 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-background border border-border  rounded-lg  hover:bg-gray-100 hover:text-tan focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-500 dark:bg-gray-400 dark:text-cta-text dark:border-gray-500 dark:hover:bg-gray-400 cursor-pointer flex items-center justify-center`}
          >
            <FiCamera className="h-4" />
          </button>
          {useFormUploadImageItem.imagePreview && (
            <button className="w-1/2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-background border border-border  rounded-lg  hover:bg-gray-100 hover:text-tan focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-500 dark:bg-gray-400 dark:text-cta-text dark:border-gray-500 dark:hover:bg-gray-400 cursor-pointer flex items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="w-full h-full flex items-center justify-center"
              >
                <FaArrowRotateLeft className="h-4 mr-2" /> Retry
              </label>
            </button>
          )}
        </div>
        <ButtonItems
          name={"Upload"}
          onClick={() => {
            useFormUploadImageItem.handleUpload();
          }}
          type={"submit"}
          withs={"full"}
          loading={useFormUploadImageItem.loading}
        />
      </div>
    </div>
  );
}
