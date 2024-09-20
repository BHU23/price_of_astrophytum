import { PredictionHistoryInterface } from "./predictionHistorys.interface";
import { UserProfileDisplayInterface } from "./user.interface";

export interface HistoryPredicstionInterface {
  id: number;
  image: string;
  timestamp: string;
  total_max: number;
  total_min: number;
  user_profile: UserProfileDisplayInterface;
  predictions: PredictionHistoryInterface[];
}
