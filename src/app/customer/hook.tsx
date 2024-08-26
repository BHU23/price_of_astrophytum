"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import generateBreadcrumbLinks from "./hook/breadcrum.hook";
import { useGlobal } from "@/context/useGoble";

export default function useCustumer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isOpen, setIsOpen } = useGlobal();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsOpen(false);
  };
  const path = usePathname();
  const breadcrumbLinks = generateBreadcrumbLinks(path);

  return {
    custumerItems: {
      isOpen,
      setIsOpen,
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar,
      breadcrumbLinks,
    },
  };
}
