"use client";

import { Knewave } from "next/font/google";
const knewave = Knewave({ weight: "400", subsets: ["latin"] });

import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartConfiguration, LinearScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import FilterPanel from '../../components/FilterPanel';
import { TrendController } from "../controller";
import { IntakeController } from "./controller";
import {
  ActivityFilter,
  NutrientFilter,
  TemporalFilter,
  Trend,
  ChartData,
} from "../types";

const getData = (graphType: any) => {
  // run queries to get data in future
  if (graphType == "Calories")
    return {
      datasets: [{
        data: [{x:10,y:10}]
      }] // Add datasets here
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



const IntakePage: React.FC = () => {

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [activityFilter, setActivityFilter] = useState("Calories");
  const [nutritionFilter, setNutritionFilter] = useState("Calories");
  const trendController: IntakeController = new IntakeController();

  Chart.register(LinearScale);

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  
  const handleFilterChange = (filter: string, activity: boolean) => {
    // toggle the selected filter on the trendController
    
    
    if (activity) {
      if (filter == "Calories")
        trendController.toggleFilterSelection("Activity", ActivityFilter.Calories);
      else if (filter == "Distance")
        trendController.toggleFilterSelection("Activity", ActivityFilter.Distance);
      else if (filter == "Duration")
        trendController.toggleFilterSelection("Activity", ActivityFilter.Duration);
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
      else if (filter == "Food")
        trendController.toggleFilterSelection("Nutrient", NutrientFilter.Food);
      else if (filter == "Protein")
        trendController.toggleFilterSelection("Nutrient", NutrientFilter.Protein);
      else 
        trendController.toggleFilterSelection("Nutrient", NutrientFilter.Quantity);
      setNutritionFilter(filter)
    }
      
    
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
                  text: "Fitness and Nutrition Intake",
                  font: {
                    size: 30
                  }
                }},
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Activity: " + activityFilter,
                      font: {
                        size: 15
                      }
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Nutrition: " + nutritionFilter,
                      font: {
                        size: 15
                      }
                    }
                  }
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

export default IntakePage;


// //{/* <div className="w-full text-center mb-4">
//         <div className="flex items-center justify-center">
//           <h1 className="mb-0 mr-4">Activity & Calorie Intake Analysis</h1>
//           <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
//             <option value="A">Graph A</option>
//             <option value="B">Graph B</option>
//             <option value="C">Graph C</option>
//           </select>
//         </div>
//       </div> */}