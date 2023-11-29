"use client";

import { Knewave } from "next/font/google";
const knewave = Knewave({ weight: "400", subsets: ["latin"] });

import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartConfiguration, LinearScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import FilterPanel from '../../components/FilterPanel';
import { TrendController } from "../controller";
import { TimingController } from "./controller";
import { ActivityFilter, NutrientFilter, ControllerManager } from "../types";
import { Filters, ChartData, Trend } from "../types";
//import { ChartData } from "../types";

// const getData = async (controller: TimingController, startDate: string, endDate: string) => {
  
//   // else
//   //   return {
//   //     datasets: [{
//   //       data: [{x:20,y:20}, {x:30,y:20}]
//   //     }] // Add datasets here
//   //   }
//   const start = new Date(startDate);
//   const end = new Date(endDate)
//   const data = (await controller.useTrendManager(start, end));
//   return data.chartData.datasets[3];
//   //return data;
// }

const TimingPage: React.FC = () => {
  //const chartData =
  const [dataSet, setDataset] = useState<ChartData<Trend.Timing>>();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [activityFilter, setActivityFilter] = useState("Calories");
  const [nutritionFilter, setNutritionFilter] = useState("Calories");
  const trendController: TimingController = new TimingController();
  const [controllerManager, setControllerManager] = useState<ControllerManager>();

  Chart.register(LinearScale);

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect (() => {
    const start = new Date(startDate);
    const end = new Date(endDate)
    const func = async () => {
      setControllerManager(await trendController.useTrendManager(start, end)); 
      //return manager;
    }
    //const manager = await func();
    if (controllerManager)
      setDataset(controllerManager.chartData.datasets[0])
  }, [startDate, endDate])
  
  const handleFilterChange = (filter: string, activity: boolean) => {
    if (activity) {
      if (filter == "Calories")
        trendController.toggleFilterSelection("Activity", ActivityFilter.Calories);
      else if (filter == "Duration")
        trendController.toggleFilterSelection("Activity", ActivityFilter.Duration);
      else if (filter == "Distance")
        trendController.toggleFilterSelection("Activity", ActivityFilter.Distance);
      else
        trendController.toggleFilterSelection("Activity", ActivityFilter.Pace);

      setActivityFilter(filter);
    }
      
    else {
      if (filter == "Calories")
        trendController.toggleFilterSelection("Nutrient", NutrientFilter.Calories);
      else if (filter == "Carbs")
        trendController.toggleFilterSelection("Nutrient", NutrientFilter.Carbs);
      else if (filter == "Fat")
        trendController.toggleFilterSelection("Nutrient", NutrientFilter.Fat);
      else
        trendController.toggleFilterSelection("Nutrient", NutrientFilter.Protein);
      // else if (filter == "Pace")
      //   trendController.toggleFilterSelection("Nutrient", NutrientFilter.Protein);

      setNutritionFilter(filter);
    }
      
    
    // toggle the selected filter on the trendController
    //trendController.toggleFilterSelection("Activity", trendController.filters.Activity.Calories)
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* ATHLEAT Header */}
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
      </div>
  
      {/* Main Content */}
      <div className="flex-1 p-8 flex">
        <div className="flex-1">
          <Scatter
            data={dataSet}
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
          <FilterPanel trendController={trendController} onDateRangeChange={handleDateRangeChange} onFilterChange={handleFilterChange} defaultFilters={{activity: 'Calories', nutrition: 'Calories'}} />
        </div>
      </div>
    </main>
  );
  
};

export default TimingPage;

