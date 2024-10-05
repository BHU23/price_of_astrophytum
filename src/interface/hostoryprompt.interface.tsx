import { HistoryPredicstionInterface } from "./historyPredictions.interface";
import { UserProfileDisplayInterface } from "./user.interface";

export interface HistoryPromptInterface {
  id: number;
  prompt: string;
  result: string;
  classes: string[];
  image: string;
  price?: number;
  timestamp: string;
  user_profile: UserProfileDisplayInterface | null;
  history_predictions: HistoryPredicstionInterface | null;
  role?: RoleInterface | null;
  style?: StyleInterface | null;
}

export interface PromptfromInterface {
  prompt: string;
  result: string;
  classes: string[];
  image: string;
  price?: number;
  history_prediction_id: number | null;
  role_id: number | null;
  style_id: number | null;
}

export interface RoleInterface {
  id: number;
  name: string;
}

export interface StyleInterface {
  id: number;
  name: string;
}

