"use client";

import { useState } from "react";
import { useGlobal } from "@/context/useGlobal";

export default function useUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isOpen, setIsOpen, breadcrumbLinks } = useGlobal();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsOpen(false);
  };

  return {
    useUserItems: {
      isOpen,
      setIsOpen,
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar,
      breadcrumbLinks,
    },
  };
}
