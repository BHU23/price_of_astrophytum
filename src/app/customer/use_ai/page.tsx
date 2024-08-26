"use client";
import Breadcrumb from "@/components/layout/breadcrumbs";
import generateBreadcrumbLinks from "../hook/breadcrum.hook";
import { usePathname } from "next/navigation";
import UploadImage from "@/components/use_ai/upload_image";
import ResultClasscification from "@/components/use_ai/result_classcification";
export default function UseAI() {
  const path = usePathname();
  const breadcrumbLinks = generateBreadcrumbLinks(path);
  return (
    <>
      {/* <div className="w-full h-16 px-5 text-cta-text ">hi</div> */}
      <div className="flex flex-wrap lg:flex-nowrap w-full h-full p-5 pt-0 gap-5">
        <UploadImage />
        <div className="w-[1px] bg-border text-cta hidden lg:block"> </div>
        <div className="w-full h-full p-5 bg-card rounded-lg">
          <ResultClasscification></ResultClasscification>
        </div>
      </div>
    </>
  );
}
