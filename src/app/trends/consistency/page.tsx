"use client";

import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartConfiguration, LinearScale } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import FilterPanel from '../../components/FilterPanel';
import { TrendController } from "../controller";
import { ConsistencyController } from "./controller";
import { Filters } from "../types";

const getData = (graphType: any) => {
  // run queries to get data in future
  // if (graphType == "Calories")
    return {
      labels: ['Friday', 'Saturday', 'Sunday', 'Monday'],
      datasets: [{
        data: [5,8,7.5,10],
        yAxisID: 'y',
      },
      {
        data: [1,2,6,3],
        yAxisID: 'y1'
      }] // Add datasets here
    }
  // else if (graphType == "Duration")
  //   return {
  //     datasets: [{
  //       data: [{x:5,y:5}, {x:1,y:2}]
  //     }] // Add datasets here
  //   }
  // else
  //   return {
  //     datasets: [{
  //       data: [{x:20,y:20}, {x:30,y:20}]
  //     }] // Add datasets here
  //   }
}



const ConsistencyPage: React.FC = () => {

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [activityFilter, setActivityFilter] = useState("Calories");
  const [nutritionFilter, setNutritionFilter] = useState("Calories");
  const trendController: ConsistencyController = new ConsistencyController();

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
    <main className="flex min-h-screen items-center justify-center p-8">
      
      <div className="flex-1 p-8">
        <Line
          data={getData(activityFilter)}
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
        <FilterPanel trendController={trendController} onDateRangeChange={handleDateRangeChange} onFilterChange={handleFilterChange} defaultFilters={{activity: 'Calories', nutrition: 'Calories'}} />
      </div>
      
    </main>
  );
};

export default ConsistencyPage;

