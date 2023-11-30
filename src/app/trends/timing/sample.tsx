interface TimingChartData {
  x: Number;
  y: Number;
}

import React from "react";
import { TimingController } from "./controller";
import { ActivityFilter, Filter, NutrientFilter } from "../types";

const ControllerSampleUsageComponent: React.FC = () => {
  const controller = new TimingController();
  const [activityFilter, setActivityFilter] =
    React.useState<Filter<ActivityFilter>>();
  const [activityData, setActivityData] = React.useState<TimingChartData[]>();

  const [nutritionFilter, setNutritionFilter] =
    React.useState<Filter<NutrientFilter>>();
  const [nutritionData, setNutritionData] = React.useState<TimingChartData[]>();

  React.useEffect(() => {
    //This is an async function inside of useEffect that is called immediately after the component is mounted down on line 71
    async function runTimingManager() {
      const oneYearAgo = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      );
      const today = new Date();
      const manager = await controller.useTrendManager(oneYearAgo, today);

      setActivityFilter(
        Object.values(manager.filters.Activity).find(
          (filter) => filter.selected
        )
      );

      setNutritionFilter(
        Object.values(manager.filters.Nutrient).find(
          (filter) => filter.selected
        )
      );

      if (activityFilter === undefined) {
        throw new Error("No activity filter selected");
      } else if (activityFilter.filter === "Calories") {
        //You will have to write a unique <Trend>ChartData interface for each trend that matches what the chart expects
        const activityDataToGoToChart: TimingChartData[] = []; //These should be different colors for each dataset
        const nutrientDataToGoToChart: TimingChartData[] = []; //These should be different colors for each dataset

        manager.chartData.datasets.map((dataset, i) => {
          if (dataset.type === "Activity") {
            if (manager.filters.Activity.Calories)
              //In the case of the scatter plot, it expects (x,y) pairs, so you need to map the x and y values to the correct fields
              //In the case of the line chart, this will be slightly different
              //In the case of the big effort analysis, we wont need to process much since we can just pass the data straight to a card
              activityDataToGoToChart.push({
                x: manager.chartData.labels[i], //Figure out how to make the date as a number, OR use a string type X axis (line chart?)
                y: dataset.caloricVolume, //Instead of caloricVolume, use the value of the selected filter on the other charts
              });
            //Add additional filter cases here
          }
          if (dataset.type === "Nutrient") {
            if (manager.filters.Nutrient.Calories)
              nutrientDataToGoToChart.push({
                x: manager.chartData.labels[i], //Same as line 58
                y: dataset.caloricVolume,
              });
            //Add additional filter cases here
          }
        });
        //This can be changed to whatever you want, but it should be the same type as the chart expects
        //You can add a color to each one of these datasets, and the chart should automatically color them
        setActivityData(activityDataToGoToChart);
        setNutritionData(nutrientDataToGoToChart);
      }
    }

    runTimingManager();
  });
  return <></>;
};
