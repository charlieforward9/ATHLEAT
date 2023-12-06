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
import FilterPanel from "../../components/FilterPanel";
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

// const getData = async (controller: IntakeController, startDate: string, endDate: string) => {
//   // run queries to get data in future
//   // if (graphType == "Calories")
//   //   return {
//   //     datasets: [{
//   //       data: [{x:10,y:10}]
//   //     }] // Add datasets here
//   //   }
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
//   // const start = new Date(startDate);
//   // const end = new Date(endDate)
//   // const data = (await controller.useTrendManager(start, end));
//   // return data.chartData;
// }

const IntakePage: React.FC = () => {
  // const [startDate, setStartDate] = useState<string>('');
  // const [endDate, setEndDate] = useState<string>('');
  // const [activityFilter, setActivityFilter] = useState("Calories");
  // const [nutritionFilter, setNutritionFilter] = useState("Calories");
  // const trendController: IntakeController = new IntakeController();

  // Chart.register(LinearScale);

  // const handleDateRangeChange = (startDate: string, endDate: string) => {
  //   setStartDate(startDate);
  //   setEndDate(endDate);
  // };

  // const handleFilterChange = (filter: string, activity: boolean) => {
  //   // toggle the selected filter on the trendController

  //   if (activity) {
  //     if (filter == "Calories")
  //       trendController.toggleFilterSelection("Activity", ActivityFilter.Calories);
  //     else if (filter == "Distance")
  //       trendController.toggleFilterSelection("Activity", ActivityFilter.Distance);
  //     else if (filter == "Duration")
  //       trendController.toggleFilterSelection("Activity", ActivityFilter.Duration);
  //     else
  //       trendController.toggleFilterSelection("Activity", ActivityFilter.Pace);
  //     setActivityFilter(filter);
  //   }
  //   else {
  //     if (filter == "Calories")
  //       trendController.toggleFilterSelection("Nutrient", NutrientFilter.Calories);
  //     else if (filter == "Carbs")
  //       trendController.toggleFilterSelection("Nutrient", NutrientFilter.Carbs);
  //     else if (filter == "Fat")
  //       trendController.toggleFilterSelection("Nutrient", NutrientFilter.Fat);
  //     else if (filter == "Food")
  //       trendController.toggleFilterSelection("Nutrient", NutrientFilter.Food);
  //     else if (filter == "Protein")
  //       trendController.toggleFilterSelection("Nutrient", NutrientFilter.Protein);
  //     else
  //       trendController.toggleFilterSelection("Nutrient", NutrientFilter.Quantity);
  //     setNutritionFilter(filter)
  //   }

  // }
  const client = generateClient();

  const controller = new IntakeController(client);
  const [activityFilter, setActivityFilter] = useState<string>("Calories");
  const [nutritionFilter, setNutritionFilter] = useState<string>("Calories");
  // const [activityFilter, setActivityFilter] = useState<string>('Calories');
  // const [nutritionFilter, setNutritionFilter] = useState<string>('Calories');
  // const [activityData, setActivityData] = useState<ChartData<"scatter", (Point)[], unknown>>({
  //   datasets: [],
  // });
  // const [nutritionData, setNutritionData] = useState<ChartData<"scatter", (Point)[], unknown>>({
  //   datasets: [],
  // });
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
  // const [initialStart, setInitialStart] = useState<string>('');
  // const [initialEnd, setInitialEnd] = useState<string>('');

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

      // setActivityFilter(
      //   Object.values(manager.filters.Activity).find(
      //     (filter) => filter.selected
      //   )
      // );

      // setNutritionFilter(
      //   Object.values(manager.filters.Nutrient).find(
      //     (filter) => filter.selected
      //   )
      // );

      if (activityFilter === undefined || nutritionFilter === undefined) {
        console.log("here");
      } else if (true) {
        //console.log("here2");
        // const activityDataToGoToChart: Point[] = []; //These should be different colors for each dataset
        // const nutrientDataToGoToChart: Point[] = [];
        const dataToGoInChart: Point[] = [];
        const labels: string[] = [];
        //console.log("here2");
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
      {/* ATHLEAT Header
      <div className="bg-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex text-2xl items-center">
            <button className={knewave.className}>ATHLEAT</button>
          </div>
          <div className="text-xl flex-grow text-center font-bold"></div>
          <div className="flex items-center space-x-4">
            <button className="bg-white text-black border border-black px-4 py-2 rounded-md">Log Your Meals</button>
            <button className="bg-white text-black border border-black px-4 py-2 rounded-md">Sync</button>
            <button className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full">Me</button>
          </div>
        </div>
      </div> */}

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

// return (
//   <main className="flex flex-col min-h-screen">
//     {/* ATHLEAT Header
//     <div className="bg-gray-200 p-4">
//       <div className="flex items-center">
//         <div className="flex text-2xl items-center">
//           <button className={knewave.className}>ATHLEAT</button>
//         </div>
//         <div className="text-xl flex-grow text-center font-bold"></div>
//         <div className="flex items-center space-x-4">
//           <button className="bg-white text-black border border-black px-4 py-2 rounded-md">Log Your Meals</button>
//           <button className="bg-white text-black border border-black px-4 py-2 rounded-md">Sync</button>
//           <button className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full">Me</button>
//         </div>
//       </div>
//     </div> */}

//     {/* Main Content */}
//     <div className="flex-1 p-8 flex">
//       <div className="flex-1">
//         <Scatter
//           data={getData(trendController, startDate, endDate)}
//           options={{
//             plugins: {
//               title: {
//                 display: true,
//                 text: "Fitness and Nutrition Intake",
//                 font: {
//                   size: 30
//                 }
//               }},
//               scales: {
//                 y: {
//                   title: {
//                     display: true,
//                     text: "Activity: " + activityFilter,
//                     font: {
//                       size: 15
//                     }
//                   }
//                 },
//                 x: {
//                   title: {
//                     display: true,
//                     text: "Nutrition: " + nutritionFilter,
//                     font: {
//                       size: 15
//                     }
//                   }
//                 }
//               },
//           }}
//         />
//       </div>

//       <div className="w-1/4 p-8">
//         <FilterPanel trendController={trendController} onDateRangeChange={handleDateRangeChange} onFilterChange={handleFilterChange} defaultFilters={{activity: 'Calories', nutrition: 'Calories'}} />
//       </div>
//     </div>
//   </main>
// );
