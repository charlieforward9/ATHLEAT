"use client";

import { Knewave } from "next/font/google";
const knewave = Knewave({ weight: "400", subsets: ["latin"] });

import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartConfiguration, LinearScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import FilterPanel from '../../components/FilterPanel';
import { TrendController } from "../controller";
import { TimingController } from "./controller";
import { Filters } from "../types";

const getData = (graphType: any) => {
  // run queries to get data in future
  if (graphType == "Calories")
    return {
      datasets: [{
        data: [{x:10,y:10}, {x:6,y:10}, {x:4,y:8}]
      },
      {
        data: [{x:5,y:8}, {x:6,y:8}, {x:2,y:8}, {x:3, y:4}]
      }
      ] // Add datasets here
    }
  else if (graphType == "Duration")
    return {
      datasets: [{
        data: [{x:5,y:5}, {x:1,y:2}]
      }] // Add datasets here
    }
  else
    return {
      datasets: [{
        data: [{x:20,y:20}, {x:30,y:20}]
      }] // Add datasets here
    }
}

const TimingPage: React.FC = () => {

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [activityFilter, setActivityFilter] = useState("Calories");
  const [nutritionFilter, setNutritionFilter] = useState("Calories");
  const trendController: TimingController = new TimingController();

  Chart.register(LinearScale);

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  
  const handleFilterChange = (filter: string, activity: boolean) => {
    if (activity)
      setActivityFilter(filter);
    else
      setNutritionFilter(filter)
    
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
            data={getData(activityFilter)}
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

