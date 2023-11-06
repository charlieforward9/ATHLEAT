export enum DataType {
  "Activity",
  "Nutrient",
  "Mood",
}

export interface AthleatEvent {
  type: DataType;
  eventJSON: MoodEventJson | NutrientEventJson | ActivityEventJson;
}

export interface MoodEventJson {
  date: string;
  time: string;
  moodIndex: number;
}

export interface NutrientEventJson {
  date: string;
  time: string;
  food: string;
  quantity: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

export interface ActivityEventJson {
  date: string;
  time: string;
  activityType: string;
  duration: number;
  calories: number;
  distance: number;
  pace: number;
}
