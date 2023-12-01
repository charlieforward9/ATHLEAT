// interface TimingChartData {
//   x: String | number;
//   y: Number;
// }

import React, { useRef, useEffect, useState } from "react";
import { TimingController } from "./controller";
import { ActivityFilter, Filter, NutrientFilter } from "../types";
import FilterPanel from "@/app/components/FilterPanel";
import Chart, { ChartConfiguration, LinearScale, ChartData, Point } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';

const ControllerSampleUsageComponent: React.FC = () => {
  const controller = new TimingController();
  const [activityFilter, setActivityFilter] = useState<Filter<ActivityFilter>>();
  const [nutritionFilter, setNutritionFilter] = useState<Filter<NutrientFilter>>();
  //const [activityData, setActivityData] = useState<TimingChartData[]>([]);
  //const [nutritionData, setNutritionData] = useState<TimingChartData[]>([]);
  // const [activityData, setActivityData] = useState<ChartData<"scatter", (Point)[], unknown>>({
  //   datasets: [],
  // });
  // const [nutritionData, setNutritionData] = useState<ChartData<"scatter", (Point)[], unknown>>({
  //   datasets: [],
  // });
  const [combinedData, setCombinedData] = useState<ChartData<"scatter", (Point)[], unknown>>({
    datasets: [],
  });
  
  // const oneYearAgo = new Date(
  //   new Date().setFullYear(new Date().getFullYear() - 1)
  // );
  // const today = new Date();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleDateRangeChange = (startDate: string, endDate: string) => {

    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFilterChange = (filter: string, activity: boolean) => {}



  useEffect(() => {
    //This is an async function inside of useEffect that is called immediately after the component is mounted down on line 71
    async function runTimingManager() {
      // const oneYearAgo = new Date(
      //   new Date().setFullYear(new Date().getFullYear() - 1)
      // );
      // const today = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);
      const manager = await controller.useTrendManager(start, end);

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
        const activityDataToGoToChart: Point[] = []; //These should be different colors for each dataset
        //const nutrientDataToGoToChart: TimingChartData[] = []; //These should be different colors for each dataset
        // const activityDataToGoToChart: { x: number; y: number }[] = [];
        const nutrientDataToGoToChart: Point[] = [];

        manager.chartData.datasets.map((dataset, i) => {
          if (dataset.type === "Activity") {
            if (manager.filters.Activity.Calories) {
              const date = new Date(manager.chartData.labels[i]);
              const minutes = date.getMinutes();
              const point: Point = {x: minutes, y: dataset.caloricVolume} as Point;
              //In the case of the scatter plot, it expects (x,y) pairs, so you need to map the x and y values to the correct fields
              //In the case of the line chart, this will be slightly different
              //In the case of the big effort analysis, we wont need to process much since we can just pass the data straight to a card
              activityDataToGoToChart.push(
                point
              );
              //Add additional filter cases here
            }
              
            
          }
          if (dataset.type === "Nutrient") {
            if (manager.filters.Nutrient.Calories) {
              const date = new Date(manager.chartData.labels[i]);
              const minutes = date.getMinutes();
              const point: Point = {x: minutes, y: dataset.caloricVolume} as Point;
              // nutrientDataToGoToChart.push({
              //   x: minutes, //Same as line 58
              //   y: dataset.caloricVolume,
              // });
              nutrientDataToGoToChart.push(
                point
              );
            }
              
            //Add additional filter cases here
          }
        });
        //This can be changed to whatever you want, but it should be the same type as the chart expects
        //You can add a color to each one of these datasets, and the chart should automatically color them
        // const nutritionDataset = {
        //   data: nutrientDataToGoToChart
        // }
        // const activityDataset: ChartData<"scatter", (Point)[], unknown> = {
        //   datasets: [{
        //     label: "Activity",
        //     data: activityDataToGoToChart,
        //     backgroundColor: "blue"
        //   }]
        // }
        // const nutritionDataset: ChartData<"scatter", (Point)[], unknown> = {
        //   datasets: [{
        //     label: "Nutrition",
        //     data: nutrientDataToGoToChart,
        //     backgroundColor: "red"
        //   }]
        // }
        // setActivityData(activityDataset);
        // setNutritionData(nutritionDataset);

        const combinedDataset = {
          datasets: [
            {
              label: "Activity",
              data: activityDataToGoToChart,
              backgroundColor: "blue"
            },
            {
              label: "Nutrition",
              data: nutrientDataToGoToChart,
              backgroundColor: "red"
            }
          ]
        }
        setCombinedData(combinedDataset);
      }
    }

    runTimingManager();
  });
  return (
    <main className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-8 flex">
        <div className="flex-1">
          <Scatter
            data={combinedData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Exercise vs Meal Times",
                  font: {
                    size: 40
                  }
                }},
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: activityFilter?.filter,
                      font: {
                        size: 15
                      }
                    }
                  },
                },
            }}
          />
        </div>
        
        <div className="w-1/4 p-8">
          <FilterPanel trendController={controller} onDateRangeChange={handleDateRangeChange} onFilterChange={handleFilterChange} defaultFilters={{activity: 'Calories', nutrition: 'Calories'}} />
        </div>
      </div>
    </main>
  );
};
