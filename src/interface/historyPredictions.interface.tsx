export interface HistoryPredicstionInterface {
  id: number;
  image: string; // Assuming this is a base64-encoded image string
  timestamp: string; // ISO timestamp string
  total_max: number;
  total_min: number;
  user: number; // Assuming this is a user ID
}
