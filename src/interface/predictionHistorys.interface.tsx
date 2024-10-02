import { ClassesInterface } from "./classes.interface";
import { UserProfileDisplayInterface } from "./user.interface";

export interface PredictionHistorysInterface {
  id: number | null;
  image: string;
  class: ClassesInterface[];
  total_min: number;
  total_max: number;
}

export interface HistoryPredictionsInterface {
  id: number | null;
  image: string;
  predictions: PredictionHistoryInterface[];
  total_min: number;
  total_max: number;
  timestamp?: string;
  user_profile: UserProfileDisplayInterface | null;
}

export interface PredictionHistoryInterface {
  id: number;
  user: number;
  class_name: ClassesInterface;
}
