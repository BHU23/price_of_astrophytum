import { HistoryPredicstionInterface } from "./historyPredictions.interface";

export interface HistoryPromptInterface {
  id?: number;
  prompt: string;
  result: string;
  image: string;
  price?: number;
  timestamp?: string;
  user: number;
  history_predictions?: HistoryPredicstionInterface;
  role?: RoleInterface | null;
  style?: StyleInterface | null;
}

export interface HistoryPromptfromInterface {
  prompt: string;
  result: string;
  image: string;
  price?: number;
  user: number;
  history_predictions?: number;
  role: number | null;
  style: number | null;
}

export interface RoleInterface {
  id: number;
  name: string;
}

export interface StyleInterface {
  id: number;
  name: string;
}

