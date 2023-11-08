import { TrendController } from "@/app/trends/controller";
import React from "react";
import { DataType } from "@/app/types";

const FilterTab: React.FC<TrendController> = (controller) => {
  const defaultFilters = controller.getDefaultFilters();
  const allFilters = controller.getTrendFilters();

  const [startDate, setStartDate] = React.useState(
    defaultFilters.get(DataType.Start)
  );
  const [endDate, setEndDate] = React.useState(DataType.End);
  const [activityFilter, setActivityFilter] = React.useState(
    defaultFilters.get(DataType.Activity)
  );
  const [nutritionFilter, setNutritionFilter] = React.useState(
    defaultFilters.get(DataType.Nutrient)
  );
  const [moodFilter, setMoodFilter] = React.useState(
    defaultFilters.get(DataType.Mood)
  );

  return (
    <div>
      <title>Title</title>
      <section>
        <input>Start Date</input>
        <input>End Date</input>
      </section>
      {allFilters.activityFilters && (
        <section>
          {allFilters.activityFilters.map((filter) => {
            return <button key={filter}>{filter}</button>;
          })}
        </section>
      )}
      {allFilters.nutrientFilters && (
        <section>
          {allFilters.nutrientFilters.map((filter) => {
            return <button key={filter}>{filter}</button>;
          })}
        </section>
      )}
      {allFilters.moodFilters && (
        <section>
          {allFilters.moodFilters.map((filter) => {
            return <button key={filter}>{filter}</button>;
          })}
        </section>
      )}
    </div>
  );
};
