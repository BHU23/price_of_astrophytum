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
import { UserProfileInterface } from "@/interface/user.interface";

import Cookies from "js-cookie";

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
  // const [istoken, setIsToken] = useState(false);
 
  const [userProfile, setUserProfile] = useState<UserProfileInterface>({
    username: "",
    avatar: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    fackbook_name: "",
  });

  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpenModelBoolean = (b: boolean) => {
      setIsOpenModel(b);
  };
  const toggleIsOpenModel = () => {
      setIsOpenModel(!isOpenModel);
  };

  const token = Cookies.get("token");

  // const toggleToken = () => {
  //   if (token) {
  //     setIsToken(true);
  //     console.log("Token exists, setIsToken(true)");
  //   } else {
  //     setIsToken(false);
  //     console.log("No token found, setIsToken(false)");
  //   }
  // };

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
        // istoken,
        // toggleToken,
        token,
        toggleIsOpenModel,
        toggleIsOpenModelBoolean,
        isOpenModel,
        setIsOpen,
        isOpen,
        breadcrumbLinks,
        userProfile,
        setUserProfile,
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
