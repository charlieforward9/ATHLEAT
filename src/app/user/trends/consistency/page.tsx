"use client";

import React, { useRef, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import Chart, {
  ChartConfiguration,
  LinearScale,
  Point,
  ChartData,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import FilterPanel from "../../../components/FilterPanel";
import { ConsistencyController } from "./controller";
import { Filter, ActivityFilter, NutrientFilter, ConsistencyData } from "../types";


const ConsistencyPage: React.FC = () => {
  const client = generateClient();
  const controller = new ConsistencyController(client);
  // const [activityFilter, setActivityFilter] = useState<Filter<ActivityFilter>>();
  // const [nutritionFilter, setNutritionFilter] = useState<Filter<NutrientFilter>>();
  const [activityFilter, setActivityFilter] = useState<string>("Calories");
  const [nutritionFilter, setNutritionFilter] = useState<string>("Calories");
  const [combinedData, setCombinedData] = useState<ChartData<"line", (number)[], unknown>>({
    datasets: [],
  });

  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  const end = new Date();
  const [startDate, setStartDate] = useState<string>(start.toISOString());
  const [endDate, setEndDate] = useState<string>(end.toISOString());
  // const [initialStart, setInitialStart] = useState<string>('');
  // const [initialEnd, setInitialEnd] = useState<string>('');

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFilterChange = (filter: string, activity: boolean) => {
    if (activity) {
      //console.log("filter");
      if (filter === "Calories") {
        controller.toggleFilterSelection("Activity", ActivityFilter.Calories);
        setActivityFilter("Calories");
      }
      else if (filter === "Duration") {
        controller.toggleFilterSelection("Activity", ActivityFilter.Duration);
        //console.log(controller.filters.Activity.Duration?.selected);
        setActivityFilter("Duration");
      }
      else if (filter === "Distance") {
        controller.toggleFilterSelection("Activity", ActivityFilter.Distance);
        setActivityFilter("Distance")
      }
      else {
        controller.toggleFilterSelection("Activity", ActivityFilter.Pace);
        setActivityFilter("Pace")
      }
    }
    else {
      if (filter === "Calories") {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Calories);
        setNutritionFilter("Calories");
      }
      else if (filter === "Protein") {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Protein);
        setNutritionFilter("Protein");
      }
      else if (filter === "Carbs") {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Carbs);
        setNutritionFilter("Carbs");
      }
      else {
        controller.toggleFilterSelection("Nutrient", NutrientFilter.Fat);
        setNutritionFilter("Fat");
      }
    }
  }

  useEffect(() => {
    //This is an async function inside of useEffect that is called immediately after the component is mounted down on line 71
    async function runTimingManager() {

      let start = new Date(startDate);
      let end = new Date(endDate);

      const manager = await controller.useTrendManager(start, end);

      if (activityFilter === undefined || nutritionFilter === undefined) {
        console.log("here");
      } else {
        //console.log("here2");
        const activityDataset: number[] = []; //These should be different colors for each dataset
        const nutrientDataset: number[] = [];
        const labels: string[] = [];
        //console.log("here2");
        //console.log(manager.chartData.datasets)
        manager.chartData.datasets.map((dataset, i) => {
          let y, x;
          if (activityFilter === "Calories")
            y = dataset.activity.calories;
          else if (activityFilter === "Distance")
            y = dataset.activity.distance;
          else if (activityFilter === "Duration")
            y = dataset.activity.duration;
          else  
            y = dataset.activity.pace;


          if (nutritionFilter === "Calories")
            x = dataset.nutrient.calories;
          else if (nutritionFilter === "Protein")
            x = dataset.nutrient.protein;
          else if (nutritionFilter === "Fat")
            x = dataset.nutrient.fat;
          else  
            x = dataset.nutrient.carbs;
          
          const yNum = y as number;
          const xNum = x as number;
          const label: string  = manager.chartData.labels[i];
          activityDataset.push(yNum);
          nutrientDataset.push(xNum);
          labels.push(label);
        });


        const combinedDataset = {
          labels: labels,
          datasets: [
            {
              data: activityDataset,
              yAxisID: 'y',
              borderColor: "#FF6384",
              label: "Activity",
              tension: 0.25
            },
            {
              data: nutrientDataset,
              yAxisID: 'y1',
              borderColor: "#36A2EB",
              label: "Nutrition",
              tension: 0.25
            }
          ]
        }
        setCombinedData(combinedDataset);
      }
    }

    runTimingManager();
  }, [startDate, endDate, activityFilter, nutritionFilter]);

  Chart.register(LinearScale);



  return (
    <main className="flex min-h-screen items-center justify-center p-8">

      <div className="flex-1 p-8">
        <Line
          data={combinedData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Consistency Across Activities",
                font: {
                  size: 40
                }
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                  display: true,
                  text: "Activity: " + activityFilter,
                  font: {
                    size: 15
                    }
                  }
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                  display: true,
                  text: "Nutrient: " + nutritionFilter,
                  font: {
                    size: 15
                    }
                  }
                  
                }
            },
          }}
        />
      </div>

      <div className="">
        <FilterPanel trendController={controller} onDateRangeChange={handleDateRangeChange} onFilterChange={handleFilterChange} defaultFilters={{activity: 'Calories', nutrition: 'Calories'}} />
      </div>

    </main>
  );
};

export default ConsistencyPage;

