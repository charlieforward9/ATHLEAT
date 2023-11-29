export type AuthBody = {
  id: string;
  code: string;
};

export type DataBody = {
  id: string;
  message: string;
};

export type NutritionBody = {
  id: string;
  food: string;
  meal_date: string;
  meal_time: string;
};
