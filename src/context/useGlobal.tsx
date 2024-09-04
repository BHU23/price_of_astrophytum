"use client";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { UserProfileInterface } from "@/interface/user.interface";
const GlobalContext = createContext<any>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [predictionHistoryGlobal, setPredictionHistoryGlobal] =
    useState<PredictionHistorysInterface | null>({
      image: "",
      class: [],
      total_min: 0,
      total_max: 0,
    });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
 

  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpenModelBoolean = (b: boolean) => {
      setIsOpenModel(b);
  };
  const toggleIsOpenModel = () => {
      setIsOpenModel(!isOpenModel);
  };
  const toggleToken = (event: any) => {
    setToken(event);
  };

  const generateBreadcrumbLinks = (path: string) => {
    const segments = path.split("/").filter((segment) => segment);

    const links = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return { href, label: segment };
    });

    return [...links];
  };

  const path = usePathname();
  const breadcrumbLinks = generateBreadcrumbLinks(path);

  return (
    <GlobalContext.Provider
      value={{
        predictionHistoryGlobal,
        setPredictionHistoryGlobal,
        loading,
        setLoading,
        token,
        toggleToken,
        toggleIsOpenModel,
        toggleIsOpenModelBoolean,
        isOpenModel,
        setIsOpen,
        isOpen,
        breadcrumbLinks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
