"use client";

import { useState } from "react";
import "../globals.css";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import { IoCodeOutline } from "react-icons/io5";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-1">
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all ${
          isSidebarOpen ? "w-72" : "w-5"
        } hidden sm:block overflow-hidden`}
      >
        {isSidebarOpen && <Sidebar />}
        <button
          className={`absolute right-2 top-1/2 w-6 h-6 border border-border rounded-lg flex items-center justify-center text-xs bg-background hover:bg-card transition-all `}
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
