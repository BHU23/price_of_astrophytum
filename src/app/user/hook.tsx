"use client";
import { useGlobal } from "@/context/useGlobal";

export default function useCustumer() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    isOpen,
    setIsOpen,
    breadcrumbLinks,
    isOpenSM,
    setIsOpenSM,
    sidebarSMRef,
  } = useGlobal();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleSidebarSm = () => {
    setIsOpenSM(!isOpenSM);
  };

  return {
    custumerItems: {
      isOpen,
      setIsOpen,
      toggleSidebar,
      toggleSidebarSm,
      breadcrumbLinks,
      isOpenSM,
      setIsOpenSM,
      sidebarSMRef,
    },
  };
}
