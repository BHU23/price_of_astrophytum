
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const GlobalContext = createContext<any>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [predictions, setPredictions] = useState<string>();
  return (
    <GlobalContext.Provider
      value={{
        setPredictions,
        predictions,
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
