"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const GlobalContext = createContext<any>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

interface ProfileInterface {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [predictions, setPredictions] = useState<string>();
  const [userProfile, setUserProfile] = useState<ProfileInterface>({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });
  const [token, setToken] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);

  const toggleIsOpenModel = () => {
    setIsOpenModel(!isOpenModel);
  };
  const toggleToken = (event:any) => {
    setToken(event);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(true);
        console.log("Updated token", token);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Updated userProfile", userProfile);
  }, [userProfile]);

  return (
    <GlobalContext.Provider
      value={{
        predictions,
        setPredictions,
        userProfile,
        setUserProfile,
        token,
        toggleToken,
        toggleIsOpenModel,
        isOpenModel,
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
