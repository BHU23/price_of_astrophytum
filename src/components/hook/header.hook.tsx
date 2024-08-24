"use client";

import { useState} from "react";

export default function useHeader() {
  const [isOpen, setIsOpen] = useState(false);
   
  return {
    headerItems: {
      isOpen,
      setIsOpen,
    },
  };
}
