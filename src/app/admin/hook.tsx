"use client";

import { useState } from "react";
import { useGlobal } from "@/context/useGlobal";

export default function useCustumer() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isOpen, setIsOpen, breadcrumbLinks } = useGlobal();
  const toggleSidebar = () => {
    // setIsSidebarOpen(!isSidebarOpen);
    setIsOpen(!isOpen);
  };

  return {
    custumerItems: {
      isOpen,
      setIsOpen,
      // isSidebarOpen,
      // setIsSidebarOpen,
      toggleSidebar,
      breadcrumbLinks,
    },
  };
}

