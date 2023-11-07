import { DataType } from "../types";

export enum Trend {
  "Intake",
  "Effort",
  "Consistency",
  "Timing",
}

export interface Filter {
  filter: TemporalFilter | ActivityFilter | NutrientFilter | MoodFilter;
  value?: string | number;
}

export type FilterMap = Map<DataType, Filter>;

export interface FilterOptions {
  temporalFilters?: TemporalFilter[];
  activityFilters?: ActivityFilter[];
  nutrientFilters?: NutrientFilter[];
  moodFilters?: MoodFilter[];
}

export enum TemporalFilter {
  Start,
  End,
  Time,
}

export enum ActivityFilter {
  Type,
  Duration,
  Calories,
  Distance,
  Pace,
}

export enum NutrientFilter {
  Food,
  Quantity,
  Calories,
  Carbs,
  Fat,
  Protein,
}

export enum MoodFilter {
  Index,
}
