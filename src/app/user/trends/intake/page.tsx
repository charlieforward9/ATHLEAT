"use client";

// import { Knewave } from "next/font/google";
// const knewave = Knewave({ weight: "400", subsets: ["latin"] });

import React, { useRef, useEffect, useState } from "react";
import Chart, {
  ChartConfiguration,
  LinearScale,
  Point,
  ChartData,
} from "chart.js/auto";
import { Scatter } from "react-chartjs-2";
import FilterPanel from "../../../components/FilterPanel";
import { TrendController } from "../controller";
import { IntakeController } from "./controller";
import {
  ActivityFilter,
  NutrientFilter,
  TemporalFilter,
  Trend,
  Filter,
} from "../types";
import { generateClient } from "aws-amplify/api";


const IntakePage: React.FC = () => {
  const client = generateClient();

  const controller = new IntakeController(client);
  const [activityFilter, setActivityFilter] = useState<string>("Calories");
  const [nutritionFilter, setNutritionFilter] = useState<string>("Calories");
  const [combinedData, setCombinedData] = useState<
    ChartData<"scatter", Point[], unknown>
  >({
    datasets: [],
  });

  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  const end = new Date();
  const [startDate, setStartDate] = useState<string>(start.toISOString());
  const [endDate, setEndDate] = useState<string>(end.toISOString());


  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFilterChange = (filter: string, activity: boolean) => {
    if (activity) {
      console.log("filter");
      if (filter === "Calories") {
        controller.toggleFilterSelection("Activity", ActivityFilter.Calories);
        setActivityFilter("Calories");
      } else if (filter === "Duration") {
        controller.toggleFilterSelection("Activity", ActivityFilter.Duration);
        //console.log(controller.filters.Activity.Duration?.selected);
        setActivityFilter("Duration");
      } else if (filter === "Distance") {
        controller.toggleFilterSelection("Activity", ActivityFilter.Distance);
        setActivityFilter("Distance");
      } else {
        controller.toggleFilterSelection("Activity", ActivityFilter.Pace);
        setActivityFilter("Pace");
      }
    } else {
      if (filter === "Calories") {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Calories);
        setNutritionFilter("Calories");
      } else if (filter === "Protein") {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Protein);
        setNutritionFilter("Protein");
      } else if (filter === "Carbs") {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Carbs);
        setNutritionFilter("Carbs");
      } else {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Fat);
        setNutritionFilter("Fat");
      }
    }
  };

  useEffect(() => {
    //This is an async function inside of useEffect that is called immediately after the component is mounted down on line 71
    async function runTimingManager() {
      let start = new Date(startDate);
      let end = new Date(endDate);

      const manager = await controller.useTrendManager(start, end);

      if (activityFilter === undefined || nutritionFilter === undefined) {
        console.log("here");
      } else if (true) {
        const dataToGoInChart: Point[] = [];
        const labels: string[] = [];
        
        manager.chartData.datasets.map((dataset, i) => {
          let y: number | undefined, x: number | undefined;
          if (activityFilter === "Calories") y = dataset.activity.calories;
          else if (activityFilter === "Distance") y = dataset.activity.distance;
          else if (activityFilter === "Duration") y = dataset.activity.duration;
          else y = dataset.activity.pace;

          if (nutritionFilter === "Calories") x = dataset.nutrient.calories;
          else if (nutritionFilter === "Protein") x = dataset.nutrient.protein;
          else if (nutritionFilter === "Fat") x = dataset.nutrient.fat;
          else x = dataset.nutrient.carbs;
          console.log(dataset.activity.calories);
          console.log(dataset.nutrient.calories);
          const point: Point = { x: x, y: y, text: `Date: ${manager.chartData.labels[i]}` } as Point;
          dataToGoInChart.push(point);
          labels.push(manager.chartData.labels[i]);
        });

        const combinedDataset = {
          labels: labels,
          datasets: [
            {
              data: dataToGoInChart,
              
              
            },
            
          ],
        };
        setCombinedData(combinedDataset);
      }
    }

    runTimingManager();
  }, [startDate, endDate, nutritionFilter, activityFilter]);

  Chart.register(LinearScale);

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
                  text: "Fitness and Nutrition Intake",
                  font: {
                    size: 30,
                  },
                },
                legend: {
                  display: false
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Activity: " + activityFilter,
                    font: {
                      size: 15,
                    },
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Nutrition: " + nutritionFilter,
                    font: {
                      size: 15,
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="w-1/4 p-8">
          <FilterPanel
            trendController={controller}
            onDateRangeChange={handleDateRangeChange}
            onFilterChange={handleFilterChange}
            defaultFilters={{ activity: "Calories", nutrition: "Calories" }}
          />
        </div>
      </div>
    </main>
  );
};

export default IntakePage;


