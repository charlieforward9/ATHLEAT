export type AuthBody = {
  id: string;
  code: string;
};

export type FetchBody = {
  id: string;
};

export type NutritionBody = {
  user_id: string;
  food: string;
  meal_date: string;
  meal_time: string;
};
