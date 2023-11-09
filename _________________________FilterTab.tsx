import { TrendController } from "@/app/trends/controller";
import React from "react";

const FilterTab: React.FC<TrendController> = (controller) => {
  const localFilters = controller.filters;

  const [startDate, setStartDate] = React.useState(
    localFilters.Temporal?.Start?.value
  );
  const [endDate, setEndDate] = React.useState(
    localFilters.Temporal?.End?.value
  );
  const [activityFilter, setActivityFilter] = React.useState(
    localFilters.Activity?.Calories?.value
  );
  const [nutritionFilter, setNutritionFilter] = React.useState(
    localFilters.Nutrient?.Calories?.value
  );
  const [moodFilter, setMoodFilter] = React.useState(
    localFilters.Mood?.Index?.value
  );

  //TODO: Add a useEffect to update the data when the localFilters change (if date changes we need to trigger a new DB response AND filter the data)
  //TODO: Use controller.trend, to conditionally display the type of input we expect from the user. (click, range, etc.)

  return (
    <div>
      <title>Title</title>
      <section>
        <input>Start Date</input>
        <input>End Date</input>
      </section>
      {localFilters.Activity && (
        <section>
          {Object.entries(localFilters.Activity).map(([name, details]) => {
            return <button key={"activity" + name}>{details.selected}</button>;
          })}
        </section>
      )}
      {localFilters.Nutrient && (
        <section>
          {Object.entries(localFilters.Nutrient).map(([name, details]) => {
            return <button key={"nutrient" + name}>{details.selected}</button>;
          })}
        </section>
      )}
      {localFilters.Mood && (
        <section>
          {Object.entries(localFilters.Mood).map(([name, details]) => {
            return <button key={"mood" + name}>{details.selected}</button>;
          })}
        </section>
      )}
    </div>
  );
};
