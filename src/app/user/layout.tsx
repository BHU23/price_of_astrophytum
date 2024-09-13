"use client";
import "../globals.css";
import Footer from "@/components/layout/footer";
import { IoCodeOutline } from "react-icons/io5";
import Breadcrumb from "@/components/layout/breadcrumbs";
import useCustumer from "./hook";
import SidebarUser from "@/components/layout/sidebar_user";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, toggleSidebar, breadcrumbLinks } = useCustumer().useUserItems;
  return (
    <div className="flex flex-1">
      <aside
        className={`fixed top-14 sm:top-16 left-0 sm:h-[calc(100vh-4rem)] h-[calc(100vh-3.5rem)] transition-all z-[99] 
          ${isOpen ? "bg-background w-72 " : "w-5"}

         `}
      >
        {isOpen && <SidebarUser />}
        <button
          className={`absolute right-2 top-1/2 w-6 h-6 border border-border rounded-lg sm:flex items-center justify-center text-xs bg-background hover:bg-card transition-all hidden`}
          onClick={toggleSidebar}
        >
          <IoCodeOutline />
        </button>
      </aside>
      <main
        className={`flex-1 pl-0 pr-5 transition-all ${
          isOpen ? "sm:ml-72 ml-5" : "ml-5 pb-0"
        }`}
      >
        <div className="min-h-[calc(100vh-6rem)] h-auto w-full flex flex-col gap-5 rounded-lg border border-border">
          <Breadcrumb links={breadcrumbLinks} />
          {children}
        </div>
        <div className={`py-5 ${isOpen ? "" : "-pl-5"}`}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
