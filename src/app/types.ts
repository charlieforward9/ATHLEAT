export type MoodEventJson = {
  date: string;
  time: string;
  moodIndex: number;
};

export type NutrientEventJson = {
  date: string;
  time: string;
  food: string;
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

export type APIResponseEvent = {
  __typename: "Event";
  id: string;
  type: string;
  eventJSON: string;
  date: string;
  time: string;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
  userID: string;
  owner?: string | null | undefined;
}