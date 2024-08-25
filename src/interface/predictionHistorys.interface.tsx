import { ClassesInterface } from "./classes.interface";

export interface PredictionHistorysInterface {
  image: string;
  class: ClassesInterface[];
  total_min: number;
  total_max: number;
}
