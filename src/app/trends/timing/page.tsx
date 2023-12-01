"use client";

// import { Knewave } from "next/font/google";
// const knewave = Knewave({ weight: "400", subsets: ["latin"] });

// import React, { useRef, useEffect, useState } from "react";
// import Chart, { ChartConfiguration, LinearScale } from 'chart.js/auto';
// import { Scatter } from 'react-chartjs-2';
// import FilterPanel from '../../components/FilterPanel';
// import { TrendController } from "../controller";
// import { TimingController } from "./controller";
// import { ActivityFilter, NutrientFilter, ControllerManager } from "../types";
// import { Filters, ChartData, Trend } from "../types";
// //import { ChartData } from "../types";

// // const getData = async (controller: TimingController, startDate: string, endDate: string) => {
  
// //   // else
// //   //   return {
// //   //     datasets: [{
// //   //       data: [{x:20,y:20}, {x:30,y:20}]
// //   //     }] // Add datasets here
// //   //   }
// //   const start = new Date(startDate);
// //   const end = new Date(endDate)
// //   const data = (await controller.useTrendManager(start, end));
// //   return data.chartData.datasets[3];
// //   //return data;
// // }

// const TimingPage: React.FC = () => {
//   //const chartData =
//   const [dataSet, setDataset] = useState<ChartData<Trend.Timing>>();
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');
//   const [activityFilter, setActivityFilter] = useState("Calories");
//   const [nutritionFilter, setNutritionFilter] = useState("Calories");
//   const trendController: TimingController = new TimingController();
//   const [controllerManager, setControllerManager] = useState<ControllerManager>();

//   Chart.register(LinearScale);

//   const handleDateRangeChange = (startDate: string, endDate: string) => {
//     setStartDate(startDate);
//     setEndDate(endDate);
//   };

//   useEffect (() => {
//     const start = new Date(startDate);
//     const end = new Date(endDate)
//     const func = async () => {
//       setControllerManager(await trendController.useTrendManager(start, end)); 
//       //return manager;
//     }
//     //const manager = await func();
//     if (controllerManager)
//       setDataset(controllerManager.chartData.datasets[0])
//   }, [startDate, endDate])
  
//   const handleFilterChange = (filter: string, activity: boolean) => {
//     if (activity) {
//       if (filter == "Calories")
//         trendController.toggleFilterSelection("Activity", ActivityFilter.Calories);
//       else if (filter == "Duration")
//         trendController.toggleFilterSelection("Activity", ActivityFilter.Duration);
//       else if (filter == "Distance")
//         trendController.toggleFilterSelection("Activity", ActivityFilter.Distance);
//       else
//         trendController.toggleFilterSelection("Activity", ActivityFilter.Pace);

//       setActivityFilter(filter);
//     }
      
//     else {
//       if (filter == "Calories")
//         trendController.toggleFilterSelection("Nutrient", NutrientFilter.Calories);
//       else if (filter == "Carbs")
//         trendController.toggleFilterSelection("Nutrient", NutrientFilter.Carbs);
//       else if (filter == "Fat")
//         trendController.toggleFilterSelection("Nutrient", NutrientFilter.Fat);
//       else
//         trendController.toggleFilterSelection("Nutrient", NutrientFilter.Protein);
//       // else if (filter == "Pace")
//       //   trendController.toggleFilterSelection("Nutrient", NutrientFilter.Protein);

//       setNutritionFilter(filter);
//     }
      
    
//     // toggle the selected filter on the trendController
//     //trendController.toggleFilterSelection("Activity", trendController.filters.Activity.Calories)
//   }

//   return (
//     <main className="flex flex-col min-h-screen">
//       {/* ATHLEAT Header */}
//       <div className="bg-gray-200 p-4">
//         <div className="flex items-center">
//           <div className="flex text-2xl items-center">
//             <button className={knewave.className}>ATHLEAT</button>
//           </div>
//           <div className="text-xl flex-grow text-center font-bold"></div>
//           <div className="flex items-center space-x-4">
//             <button className="bg-white text-black border border-black px-4 py-2 rounded-md">Log Your Meals</button>
//             <button className="bg-white text-black border border-black px-4 py-2 rounded-md">Sync</button>
//             <button className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full">Me</button>
//           </div>
//         </div>
//       </div>
  
//       {/* Main Content */}
//       <div className="flex-1 p-8 flex">
//         <div className="flex-1">
//           <Scatter
//             data={dataSet}
//             options={{
//               plugins: {
//                 title: {
//                   display: true,
//                   text: "Exercise vs Meal Times",
//                   font: {
//                     size: 40
//                   }
//                 }},
//                 scales: {
//                   y: {
//                     title: {
//                       display: true,
//                       text: activityFilter,
//                       font: {
//                         size: 15
//                       }
//                     }
//                   },
//                 },
//             }}
//           />
//         </div>
        
//         <div className="w-1/4 p-8">
//           <FilterPanel trendController={trendController} onDateRangeChange={handleDateRangeChange} onFilterChange={handleFilterChange} defaultFilters={{activity: 'Calories', nutrition: 'Calories'}} />
//         </div>
//       </div>
//     </main>
//   );
  
// };

// export default TimingPage;

import React, { useRef, useEffect, useState } from "react";
import { TimingController } from "./controller";
import { ActivityFilter, Filter, NutrientFilter } from "../types";
import FilterPanel from "@/app/components/FilterPanel";
import Chart, { ChartConfiguration, LinearScale, ChartData, Point } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';

const TimingPage: React.FC = () => {
  const controller = new TimingController();
  const [activityFilter, setActivityFilter] = useState<string>('Calories');
  const [nutritionFilter, setNutritionFilter] = useState<string>('Calories');
  const [combinedData, setCombinedData] = useState<ChartData<"scatter", (Point)[], unknown>>({
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

  const handleFilterChange = (filter: string, activity: boolean) => {}

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
      
      //console.log(activityFilter);

      // setNutritionFilter(
      //   Object.values(manager.filters.Nutrient).find(
      //     (filter) => filter.selected
      //   )
      // );

      if (activityFilter === undefined) {
        console.log("here");
        //throw new Error("No activity filter selected");
      } else if (activityFilter === "Calories") {
        //console.log("here2");
        const activityDataToGoToChart: Point[] = []; //These should be different colors for each dataset
        const nutrientDataToGoToChart: Point[] = [];

        manager.chartData.datasets.map((dataset, i) => {
          if (dataset.type === "Activity") {
            if (manager.filters.Activity.Calories) {
              const date = new Date(manager.chartData.labels[i]);
              const minutes = date.getMinutes();
              const point: Point = {x: minutes, y: dataset.caloricVolume} as Point;
              
              activityDataToGoToChart.push(
                point
              );
            }
            
          }
          if (dataset.type === "Nutrient") {
            if (manager.filters.Nutrient.Calories) {
              const date = new Date(manager.chartData.labels[i]);
              const minutes = date.getMinutes();
              const point: Point = {x: minutes, y: dataset.caloricVolume} as Point;

              nutrientDataToGoToChart.push(
                point
              );
            }
              
            //Add additional filter cases here
          }
        });
        
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
                  text: "Exercise vs Meal Times",
                  font: {
                    size: 40
                  }
                }},
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: activityFilter,
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

export default TimingPage;