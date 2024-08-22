"use client";

import { useState } from "react";
import "../globals.css";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import { IoCodeOutline } from "react-icons/io5";
import { useGlobal } from "@/context/useGoble";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isOpen, setIsOpen } = useGlobal();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-1">
      <aside
        className={`fixed top-14 sm:top-16 left-0 sm:h-[calc(100vh-4rem)] h-[calc(100vh-3.5rem)] transition-all
          ${isOpen ? "bg-black w-72 block" : "hidden sm:block"}
          ${isSidebarOpen ? "w-72 " : "w-5 "} 
         `}
        
      >
        {isSidebarOpen && <Sidebar />}

        <button
          className={`absolute right-2 top-1/2 w-6 h-6 border border-border rounded-lg sm:flex items-center justify-center text-xs bg-background hover:bg-card transition-all hidden`}
          onClick={toggleSidebar}
        >
          <IoCodeOutline />
        </button>
      </aside>
      <main
        className={`flex-1 pl-0 pr-5 transition-all ${
          isSidebarOpen ? "sm:ml-72 ml-5" : "ml-5 pb-0"
        }`}
      >
        {children}
        <div className={`py-5 ${isSidebarOpen ? "" : "-pl-5"}`}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
