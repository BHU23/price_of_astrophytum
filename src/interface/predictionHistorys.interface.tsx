import { ClassesInterface } from "./classes.interface";

export interface PredictionHistorysInterface {
  image: string;
  class: ClassesInterface[];
  total_min: number;
  total_max: number;
}

export interface PredictionHistoryInterface {
  id: number;
  user: number;
  class_name: ClassesInterface;
}
