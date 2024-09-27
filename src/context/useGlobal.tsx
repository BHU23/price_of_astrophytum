"use client";
import { PredictionHistorysInterface } from "@/interface/predictionHistorys.interface";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { UserProfileInterface } from "@/interface/user.interface";
import { GetUserProfile } from "@/app/admin/profile/้hook";

const GlobalContext = createContext<any>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [predictionHistoryGlobal, setPredictionHistoryGlobal] =
    useState<PredictionHistorysInterface | null>({
      id: null ,
      image: "",
      class: [],
      total_min: 0,
      total_max: 0,
    });
  const [loading, setLoading] = useState(false);


  const [loading_prompt, setLoadingPrompt] = useState(false);
  // const [istoken, setIsToken] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfileInterface>({
    username: "",
    avatar: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    role: "",
    fackbook_name: "",
  });

  useEffect(() => {
    const handleGetUserProfile = async () => {
      try {
        const data = await GetUserProfile();
        console.log(data);
        setUserProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    handleGetUserProfile();
  }, []);

  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const sidebarSMRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isOpenSM, setIsOpenSM] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarSMRef.current &&
        !sidebarSMRef.current.contains(event.target as Node) &&
        bottomRef.current &&
        !bottomRef.current.contains(event.target as Node)
      ) {
        setIsOpenSM(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleIsOpenModelBoolean = (b: boolean) => {
    setIsOpenModel(b);
  };
  const toggleIsOpenModel = () => {
    setIsOpenModel(!isOpenModel);
  };

  const generateBreadcrumbLinks = (path: string) => {
    const segments = path.split("/").filter((segment) => segment);

    const links = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return { href, label: segment };
    });
    console.log(links);
    const filteredLinks = links.filter((_, index) => index !== 0);

    return [...filteredLinks];
  };
  const generateBreadcrumbLinkslogin = (path: string) => {
    const segments = path.split("/").filter((segment) => segment);

    const links = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return { href, label: segment };
    });
    return [...links];
  };

  const path = usePathname();
  const breadcrumbLinks = generateBreadcrumbLinks(path);
  const loginpath = generateBreadcrumbLinkslogin(path);

  return (
    <GlobalContext.Provider
      value={{
        predictionHistoryGlobal,
        setPredictionHistoryGlobal,
        generateBreadcrumbLinkslogin,
        loginpath,
        loading,
        setLoading,
        loading_prompt,
        setLoadingPrompt,
        // istoken,
        // toggleToken,
        // token,
        toggleIsOpenModel,
        toggleIsOpenModelBoolean,
        isOpenModel,
        setIsOpen,
        isOpenSM,
        setIsOpenSM,
        sidebarSMRef,
        bottomRef,
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
