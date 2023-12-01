"use client";

import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartConfiguration, LinearScale, Point, ChartData } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import FilterPanel from '../../components/FilterPanel';
import { TrendController } from "../controller";
import { ConsistencyController } from "./controller";
import { Filter, ActivityFilter, NutrientFilter } from "../types";

// const getData = (graphType: any) => {
//   // run queries to get data in future
//   // if (graphType == "Calories")
//     return {
//       labels: ['Friday', 'Saturday', 'Sunday', 'Monday'],
//       datasets: [{
//         data: [5,8,7.5,10],
//         yAxisID: 'y',
//       },
//       {
//         data: [1,2,6,3],
//         yAxisID: 'y1'
//       }] // Add datasets here
//     }
//   // else if (graphType == "Duration")
//   //   return {
//   //     datasets: [{
//   //       data: [{x:5,y:5}, {x:1,y:2}]
//   //     }] // Add datasets here
//   //   }
//   // else
//   //   return {
//   //     datasets: [{
//   //       data: [{x:20,y:20}, {x:30,y:20}]
//   //     }] // Add datasets here
//   //   }
// }



const ConsistencyPage: React.FC = () => {

  
  const controller = new ConsistencyController();
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
      
      // setActivityFilter(
      //   Object.values(manager.filters.Activity).find(
      //     (filter) => filter.selected
      //   )
      // );
      //console.log(activityFilter?.filter);
      // setNutritionFilter(
      //   Object.values(manager.filters.Nutrient).find(
      //     (filter) => filter.selected
      //   )
      // );

      if (activityFilter === undefined || nutritionFilter === undefined) {
        console.log("here");
      } else {
        //console.log("here2");
        const activityDataset: number[] = []; //These should be different colors for each dataset
        const nutrientDataset: number[] = [];
        const labels: string[] = [];
        //console.log("here2");
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

          //const point: Point = {x: x, y: y} as Point;
          //dataToGoInChart.push(point);
        
        });
        

        const combinedDataset = {
          labels: labels,
          datasets: [
            {
              data: activityDataset,
              yAxisID: 'y',
              //backgroundColor: "blue"
            },
            {
              data: nutrientDataset,
              yAxisID: 'y1',
              //backgroundColor: "blue"
            }
          ]
        }
        setCombinedData(combinedDataset);
      }
    }

    runTimingManager();
  });

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
              }},
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

