export enum Trend {
  Intake = "Intake",
  Effort = "Effort",
  Consistency = "Consistency",
  Timing = "Timing",
}

// ********** Dataset Types ********** //
export type IntakeData = {
  activity: Partial<ActivityData>;
  nutrient: Partial<NutrientData>;
};

export type EffortData = {
  activity: ActivityData;
  previousDayNutrition: NutrientData[];
  currentDayNutrition: NutrientData[];
  mood: MoodData[];
};

export type ConsistencyData = {
  activity: Partial<ActivityData>;
  nutrient: Partial<NutrientData>;
};

export type TimingData = {
  type: string;
  caloricVolume: number;
};

export type TrendToTrendDataMap = {
  [Trend.Intake]: IntakeData[];
  [Trend.Effort]: EffortData[];
  [Trend.Consistency]: ConsistencyData[];
  [Trend.Timing]: TimingData[];

  // ... other trend to data mappings
};

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

export type TemporalData = {
  start: Date;
  end: Date;
  time: Date;
};

export type ActivityData = {
  type: string;
  duration: number;
  calories: number;
  distance: number;
  pace: number;
};

export type NutrientData = {
  food: string;
  quantity: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};

export type MoodData = {
  index: number;
  notes: string;
};

export interface ChartData<T extends keyof TrendToTrendDataMap> {
  trend: T;
  labels: string[];
  datasets: TrendToTrendDataMap[T];
}

//Controller Type
export interface ControllerManager<T extends Trend> {
  filters: FilterMap;
  chartData: ChartData<T>;
}
