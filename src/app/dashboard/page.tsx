"use client";
import Breadcrumb from "@/components/breadcrumbs";
import BoxPost from "@/components/box_yourpost";
import generateBreadcrumbLinks from "../hook/hook";
import { usePathname } from "next/navigation";
export default function Home() {
  const path = usePathname();
  const breadcrumbLinks = generateBreadcrumbLinks(path);
  const imglink = "https://planetdesert.com/cdn/shop/products/astrophytumasteriasnudum_8_1400x.jpg?v=1659472694";
  return (
    <main className="min-h-screen w-full flex flex-col gap-5 rounded-lg border border-border overflow-hidden">
      <Breadcrumb links={breadcrumbLinks} />
      <div className="flex pl-5 pr-5 pb-5 w-full flex-col">
        <div className="bg-card w-full flex flex-wrap rounded-lg ">

          <div className="px-5 py-5  md:w-full xl:w-1/2">
            <div className="border-2 border-pear flex-col rounded-md">
              <div className="flex flex-row justify-between p-4">
                <div >
                  Your Classification
                </div>
                <div>
                  <svg className="h-5 w-5 fill-current text-cta-gray transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>

                </div>
              </div>
              <div className="flex justify-center pb-8 text-5xl">
                10
              </div>
            </div>

          </div>
          <div className="px-5 py-5 md:w-full xl:w-1/2 ">
            <div className="border-2 border-pear flex-col rounded-lg">
              <div className="flex flex-row justify-between p-4">
                <div >
                  Your Posts
                </div>
                <div>
                  <a
                    className=" text-cta-gray transition-colors duration-300 "
                    aria-label="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                      </path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex justify-center pb-8 text-5xl">
                4
              </div>
            </div>

          </div>
        </div>
        <div className="h-full w-full bg-card mt-5 rounded-md ">
          <div className="pt-5 pl-5">
            Your Image Predict
          </div>
          <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ml-5 ">
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />
            <BoxPost img={imglink} />

          </div>
        </div>
      </div>
    </main>
  );
}
