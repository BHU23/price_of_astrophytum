"use client";
import Breadcrumb from "@/components/breadcrumbs";
import generateBreadcrumbLinks from "./hook";
import { usePathname } from "next/navigation";
export default function Home() {
  const path = usePathname();
  const breadcrumbLinks = generateBreadcrumbLinks(path);
  return (
    <main className="h-[calc(100vh-6rem)] w-full flex flex-col gap-5 rounded-lg border border-border overflow-hidden">
      <Breadcrumb links={breadcrumbLinks} />
      <div className="w-full h-16 n-0">hi</div>
      <div className="w-full h-full p-5 pt-0">hi</div>
    </main>
  );
}
