"use client";


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





import React, { useRef, useEffect, useState } from "react";
import { TimingController } from "./controller";
import { ActivityFilter, Filter, NutrientFilter } from "../types";
import FilterPanel from "@/app/components/FilterPanel";
import Chart, {
  ChartConfiguration,
  LinearScale,
  ChartData,
  Point,
} from "chart.js/auto";
import { Scatter } from "react-chartjs-2";
import { generateClient } from "aws-amplify/api";



const TimingPage: React.FC = () => {
  const client = generateClient();
  const controller = new TimingController(client);
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
  // const [initialStart, setInitialStart] = useState<string>('');
  // const [initialEnd, setInitialEnd] = useState<string>('');

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFilterChange = (filter: string, activity: boolean) => {};

  function timeStringToMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
      throw new Error("Invalid time string format");
    }
  
    return hours * 60 + minutes;
  }

  useEffect(() => {
    //This is an async function inside of useEffect that is called immediately after the component is mounted down on line 71
    async function runTimingManager() {
      let start = new Date(startDate);
      let end = new Date(endDate);

      const manager = await controller.useTrendManager(start, end);

      if (activityFilter === undefined) {
        //console.log("here");
        //throw new Error("No activity filter selected");
      } else if (activityFilter === "Calories") {
        //console.log("here2");
        const activityDataToGoToChart: Point[] = []; //These should be different colors for each dataset
        const nutrientDataToGoToChart: Point[] = [];

        manager.chartData.datasets.map((dataset, i) => {
          //console.log(i);
          if (dataset.type === "Activity") {
            if (manager.filters.Activity.Calories) {
              const minutes = timeStringToMinutes(manager.chartData.labels[i]);
              const point: Point = {
                x: minutes,
                y: dataset.caloricVolume,
              } as Point;
              
              activityDataToGoToChart.push(point);
            }
          }
          if (dataset.type === "Nutrient") {
            if (manager.filters.Nutrient.Calories) {
              const minutes = timeStringToMinutes(manager.chartData.labels[i]);
              const point: Point = {
                x: minutes,
                y: dataset.caloricVolume,
              } as Point;
              
              nutrientDataToGoToChart.push(point);
            }

            //Add additional filter cases here
          }
        });

        const combinedDataset = {
          datasets: [
            {
              label: "Activity",
              data: activityDataToGoToChart,
              backgroundColor: "#FF6384",
            },
            {
              label: "Nutrition",
              data: nutrientDataToGoToChart,
              backgroundColor: "#36A2EB",
            },
          ],
        };
        setCombinedData(combinedDataset);
      }
    }
    
    runTimingManager();
  }, [startDate, endDate]);

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
                    size: 40,
                  },
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: activityFilter,
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

export default TimingPage;
