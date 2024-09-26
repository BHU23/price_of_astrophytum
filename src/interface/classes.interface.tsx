import { PriceInterface } from "./prices.interface";

export interface ClassesInterface {
  id: number;
  name: string;
  example_image: string;
  extra_value: number;
  description: string;
  care_instructions: string;
  price: PriceInterface;
}
export interface UpdateClassesInterface {
  id: number;
  name: string;
  example_image: string;
  extra_value: number;
  description: string;
  price: number;
}
