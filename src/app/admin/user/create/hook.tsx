"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfileDisplayInterface, UserProfileInterface } from "@/interface/user.interface";
import { CreateUserProfile } from "../hook";

export default function useCreateUserProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const initialFormData: Partial<UserProfileInterface> = {
    username: "",
    avatar: null,
    email: "",
    role: "User",
    first_name: "",
    last_name: "",
    fackbook_name: "",
  };

  const [formData, setFormData] =
    useState<Partial<UserProfileInterface>>(initialFormData);
  
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData((prev:any) => ({
            ...prev,
            avatar: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleCreateUserProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    try {
       console.log(formData);
      const result = await CreateUserProfile(formData);

      if (result) {
        router.push("/admin/user");
      } else {
        console.error("Failed to create the user profile");
        setError("Failed to create the user profile");
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
      setError("Error creating user profile: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleFileChange,
    handleInputChange,
    handleCreateUserProfile,
    loading,
    error,
  };
}
