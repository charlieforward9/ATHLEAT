export enum DataType {
  Start,
  End,
  Time,
  Activity,
  Nutrient,
  Mood,
}

export interface AthleatEvent {
  type: DataType;
  eventJSON: MoodEventJson | NutrientEventJson | ActivityEventJson;
}

export type MoodEventJson = {
  date: string;
  time: string;
  moodIndex: number;
};

export type NutrientEventJson = {
  date: string;
  time: string;
  food: string;
  quantity: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};

export type ActivityEventJson = {
  date: string;
  time: string;
  activityType: string;
  duration: number;
  calories: number;
  distance: number;
  pace: number;
};