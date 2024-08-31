// "use client";

// import ButtonItems from "@/components/button_items";
// import useClass from "./hook";
// import Line from "@/components/line";
// import { FiPlus } from "react-icons/fi";
// import InputItems from "@/components/input_items";
// import Image from "next/image";
// import Logo from "../../../../../public/logo.png";
// import LogoName from "../../../../../public/LogoName.png";
// export default function Class() {
//   const { useClassItems } = useClass();

//   return (
//     <form className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5 ">
//       <div className="w-full h-full lg:min-w-[350px] lg:w-[350px] p-5 pt-2 bg-card text-cta-text rounded-lg">
//         <div className="pr-2 flex flex-row items-center justify-center">
//           <Image
//             width={500}
//             height={500}
//             className="w-auto h-20 "
//             src={Logo}
//             alt="Logo"
//           />
//           <Image
//             width={500}
//             height={500}
//             className="w-auto h-20"
//             src={LogoName}
//             alt=""
//           />
//         </div>
//         <div className="flex flex-col gap-5">
//           <span className="text-cta-text font-semibold text-sm">Class 1</span>
//           <div>
//             {!useClassItems.imagePreview ? (
//               <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
//                 <label
//                   htmlFor="dropzone-file"
//                   className="flex flex-col items-center justify-center w-full h-full"
//                 >
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg
//                       className="w-8 h-8 mb-4 text-gray"
//                       aria-hidden="true"
//                       // xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 20 16"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                       />
//                     </svg>
//                     <p className="mb-2 text-sm tes">
//                       <span className="font-semibold text-pear">
//                         Click to upload
//                       </span>{" "}
//                       or drag and drop
//                     </p>
//                     <p className="text-xs text-cta-gray">
//                       SVG, PNG, JPG or GIF (MAX. 800x400px)
//                     </p>
//                   </div>
//                   <input
//                     id="dropzone-file"
//                     type="file"
//                     className="hidden"
//                     onChange={useClassItems.handleFileChange}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-border">
//                 <img
//                   src={useClassItems.imagePreview ?? ""}
//                   alt="Preview"
//                   className="max-h-full max-w-full object-contain"
//                 />
//               </div>
//             )}
//           </div>
//           {/* <div className="flex items-center justify-center gap-5">
//             <div className="h-[1px] bg-cta-gray w-full" />
//             <span className="text-cta-gray text-sm">or</span>
//             <div className="h-[1px] bg-cta-gray w-full" />
//           </div> */}

//           <label
//             className="text-cta-text font-semibold text-sm"
//             htmlFor="small_size"
//           >
//             Upload new Image
//           </label>
//           <input
//             className="block w-full h-10 pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer file:p-2 file:font-semibold file:h-full file:rounded-md file:border-0 file:bg-gray-800 file:text-pear file:text-sm file:mr-2 dark:hover:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
//             id="small_size"
//             type="file"
//             accept="image/*"
//             onChange={useClassItems.handleFileChange}
//           ></input>
//           <label
//             className="text-cta-text font-semibold text-sm"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             className="block w-full h-auto pr-2 text-sm text-cta-gray border border-border rounded-lg cursor-pointer p-2 font-semibold bg-card mr-2 dark:hover:text-white   dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
//             id="description"
//             rows={4}
//           ></textarea>
//         </div>
//       </div>
//       <div className="w-[1px] bg-border text-cta hidden lg:block"> </div>
//       <div className="w-full h-full p-5 bg-card rounded-lg">
//         <div className="w-full flex flex-col justify-start h-[100%] gap-5">
//           <InputItems
//             id="extra_value"
//             autoComplete=""
//             name={"Extra Value (฿):"}
//             value=""
//             htmlFor={"extra_value"}
//             type={"number"}
//             placeholder="e.g. 60.5"
//             handleChange={useClassItems.handleFileChange}
//           ></InputItems>
//           <Line />
//           <div className="flex flex-col gap-5">
//             <div className="flex justify-between flex-row gap-5">
//               <label
//                 className="text-cta-text font-semibold text-sm gap-5 w-1/2"
//                 htmlFor="price_range"
//               >
//                 Value (฿):
//               </label>
//               <div
//                 onClick={() =>
//                   useClassItems.setnewPriceState(!useClassItems.newPriceState)
//                 }
//                 className="flex items-center justify-center  h-6 cursor-pointer transition-colors duration-300 transform text-cta-text border border-transparent hover:border-black hover:border-border rounded-md w-6  hover:text-tan md:my-0 dark:hover:bg-gray-700  dark:focus:ring-gray-700 focus:outline-none focus:z-10 focus:ring-4"
//               >
//                 {!useClassItems.newPriceState ? (
//                   <FiPlus></FiPlus>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-4 h-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 )}
//               </div>
//             </div>
//           </div>
//           {!useClassItems.newPriceState ? (
//             <input
//               className="block w-full h-10 pr-2 text-sm text-cta-text border bg-background border-border rounded-lg cursor-pointer corder-gray-300  p-2.5  placeholder-gray-400  focus:ring-ring_gray focus:outline-none focus:z-10 focus:ring-2 dark:focus:ring-4"
//               placeholder="100-500"
//               required
//               type="number"
//               id="price_range"
//             ></input>
//           ) : (
//             <div className="flex justify-between gap-5">
//               <InputItems
//                 id="min_value"
//                 autoComplete=""
//                 name={"min Value:"}
//                 htmlFor={"min_value"}
//                 type={"number"}
//                 value=""
//                 placeholder="0"
//                 handleChange={useClassItems.handleFileChange}
//               ></InputItems>
//               <InputItems
//                 id="max_value"
//                 autoComplete=""
//                 value=""
//                 name={"Max Value:"}
//                 htmlFor={"max_value"}
//                 type={"number"}
//                 placeholder="99999"
//                 handleChange={useClassItems.handleFileChange}
//               ></InputItems>
//               {/* <div className="flex flex-row gap-5 items-center justify-center w-full"></div> */}
//             </div>
//           )}
//           <ButtonItems
//             name={"Update"}
//             onClick={useClassItems.handleUpdate}
//             type="submit"
//             withs="full"
//           />
//         </div>
//       </div>
//     </form>
//   );
// }
