"use client";
import "../globals.css";
import Footer from "@/components/layout/footer";
import { IoCodeOutline } from "react-icons/io5";
import useCustumer from "./hook";
import SidebarAdmin from "@/components/layout/sidebar_admin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, toggleSidebar, isOpenSM, sidebarSMRef, toggleSidebarSm } =
    useCustumer().custumerItems;

  

  return (
    <div className="flex flex-1 pt-3 sm:pt-4 ">
      <aside
        className={`fixed top-14 sm:top-16 left-0 sm:h-[calc(100vh-4rem)] h-[calc(100vh-3.5rem)] transition-all z-[99] 
          ${isOpen ? "hidden lg:block w-72 bg-transparent" : "w-5"}
        `}
      >
        {isOpen && <SidebarAdmin setIsOpenSM={() => {}} />}
        {/* <button
          className={`absolute right-2 top-1/2 w-6 h-6 border border-border rounded-lg lg:flex  items-center justify-center text-xs bg-background hover:bg-card transition-all hidden`}
          onClick={toggleSidebar}
        >
          <IoCodeOutline />
        </button> */}
      </aside>
      <aside
        ref={sidebarSMRef}
        className={`fixed top-14 sm:top-16 left-0 sm:h-[calc(100%-4rem)] h-[calc(100%-3.5rem)] transition-all z-[99] 
          ${isOpenSM ? "bg-background w-72 lg:hidden " : "w-5"}
        `}
      >
        {isOpenSM && <SidebarAdmin setIsOpenSM={() => toggleSidebarSm()} />}
      </aside>
      <main
        className={`flex-1 pl-0 pr-5 transition-all ${
          isOpen ? "lg:ml-72 ml-5" : "ml-5 pb-0"
        }`}
      >
        <div className="min-h-[calc(100vh-6rem)] h-auto w-full ">
          {children}
        </div>
        <div className={`py-5 ${isOpen ? "" : "-pl-5"}`}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
