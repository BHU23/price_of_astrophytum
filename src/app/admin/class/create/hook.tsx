"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClassesInterface } from "@/interface/classes.interface";
import { createPrice, CreateClass, GetPrice } from "../hook";
import { PriceInterface } from "@/interface/prices.interface";

export default function useCreateClass() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<ClassesInterface | null>(null);
  const [newPriceState, setNewPriceState] = useState<boolean>(false);
  const [prices, setPrices] = useState<PriceInterface[]>([]);
  const [formDataClass, setFormDataClass] = useState<ClassesInterface>({
    id: 0,
    name: "",
    description: "",
    extra_value: 0,
    price: {
      id: 0,
      value_min: 0,
      value_max: 0,
    },
    example_image: "",
    care_instructions:"",
  });

  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormDataClass((prev:any) => ({
            ...prev,
            example_image: reader.result,
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
    setFormDataClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const [valueMin, valueMax] = selectedValue.split(" - ").map(Number);

    setFormDataClass((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        value_min: valueMin,
        value_max: valueMax,
      },
    }));
  };

  const handleCreataClass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      let priceId = formDataClass.price.id;

      // Check if a new price needs to be created
      if (newPriceState) {
        const newPriceData: Partial<PriceInterface> = {
          value_min: formDataClass.price.value_min,
          value_max: formDataClass.price.value_max,
        };

        const createdPrice = await createPrice(newPriceData);

        if (createdPrice) {
          priceId = createdPrice.id;
        } else {
          throw new Error("Failed to create a new price");
        }
      }

      const createData: Partial<ClassesInterface> = {
        ...formDataClass,
        price: {
          id: priceId,
          value_min: formDataClass.price.value_min,
          value_max: formDataClass.price.value_max,
        },
      };

      const result = await CreateClass(createData);

      if (result) {
        router.push("/admin/class");
      } else {
        console.error("Failed to create the class");
        setError("Failed to create the class");
      }
    } catch (error) {
      console.error("Error creating class:", error);
      setError("Error creating class: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await GetPrice();
        if (!data) {
          throw new Error(`Error: ${data}`);
        }

        if (Array.isArray(data)) {
          const sortedPrices = data.sort((a, b) => a.value_max - b.value_max);
          setPrices(sortedPrices);
        } else {
          throw new Error("Data format is not an array");
        }
      } catch (err) {
        setError("Error fetching class: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);
  console.log("formDataClass", formDataClass);
  return {
    useClassItems: {
      handleFileChange,
      handleInputChange,
      handlePriceChange,
      newPriceState,
      formDataClass,
      setNewPriceState,
      setFormDataClass,
      prices,
      handleCreataClass,
    },
    classData: classes,
    loading,
    error,
  };
}
