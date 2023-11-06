export enum Trend {
  "Intake",
  "Effort",
  "Consistency",
  "Timing",
}

export interface FilterMap {
  filter: TemporalFilter | ActivityFilter | NutrientFilter | MoodFilter;
  value: string | number;
}

export interface FilterOptions {
  temporalFilters?: TemporalFilter[];
  activityFilters?: ActivityFilter[];
  nutrientFilters?: NutrientFilter[];
  moodFilters?: MoodFilter[];
}

export enum TemporalFilter {
  "StartDate",
  "EndDate",
  "TimeOfDay",
}

export enum ActivityFilter {
  "ActivityType",
  "ActivityDuration",
  "ActivityCalories",
  "ActivityDistance",
  "ActivityPace",
}

export enum NutrientFilter {
  "NutrientFood",
  "NutrientQuantity",
  "NutrientCalories",
  "NutrientCarbs",
  "NutrientFat",
  "NutrientProtein",
}

export enum MoodFilter {
  "MoodIndex",
}
