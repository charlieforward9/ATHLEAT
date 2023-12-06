import { ActivityEventJson, MoodEventJson, NutrientEventJson } from "../types";

export type TimelineEventColors = {
  Activity: "#FF6384";
  Nutrient: "#36A2EB";
  Mood: "#FFCE56";
};

export type TimelineEventDetails = {
  Activity: ActivityEventJson;
  Nutrient: NutrientEventJson;
  Mood: MoodEventJson;
};

// Type representing the keys of TimelineEventColors

// Interface for TimelineEvent
export type TimelineEvent<T extends keyof TimelineEventDetails> = {
  type: T;
  color: TimelineEventColors[T];
  details: TimelineEventDetails[T];
};

// Example usage
export type TimelineData = {
  date: string;
  events: TimelineEvent<"Activity" | "Nutrient" | "Mood">[];
};
