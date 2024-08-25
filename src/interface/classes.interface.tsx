import { PriceInterface } from "./prices.interface";

export interface ClassesInterface {
  id: number;
  name: string;
  example_image: string;
  extra_value: number;
  description: string;
  price: PriceInterface;
}
