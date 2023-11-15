export enum Trend {
  Intake = "Intake",
  Effort = "Effort",
  Consistency = "Consistency",
  Timing = "Timing",
}

// ********** Filter Types ********** //

export enum TemporalFilter {
  Start = "Start",
  End = "End",
  Time = "Time",
}

export enum ActivityFilter {
  Type = "Type",
  Duration = "Duration",
  Calories = "Calories",
  Distance = "Distance",
  Pace = "Pace",
}

export enum NutrientFilter {
  Food = "Food",
  Quantity = "Quantity",
  Calories = "Calories",
  Carbs = "Carbs",
  Fat = "Fat",
  Protein = "Protein",
}

export enum MoodFilter {
  Index = "Index",
}

export interface Filter<F> {
  filter: F;
  value?: string | number;
  selected: boolean;
}

export type Filters = {
  Temporal: TemporalFilter;
  Activity: ActivityFilter;
  Nutrient: NutrientFilter;
  Mood: MoodFilter;
};

export type FilterMap = {
  [D in keyof Filters]: Partial<{
    [F in Filters[D]]: Filter<F>;
  }>;
};

// ********** Chart Types ********** //

export interface ChartData<T> {
  trend: T;
  labels: string[];
  datasets: TrendData[];
}

export type TrendData = {
  label: string;
  data: number[];
  color: string;
};
