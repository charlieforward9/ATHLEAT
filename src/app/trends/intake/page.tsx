"use client";

import React, { useRef, useEffect, useState } from "react";
// import dynamic from 'next/dynamic'
import Chart, { ChartConfiguration, LinearScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';

const getData = (graphType: any) => {
  // run queries to get data in future
  if (graphType == "A")
    return {
      datasets: [{
        data: [{x:10,y:10}]
      }] // Add datasets here
    }
  else if (graphType == "B")
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

  const [graphType, setGraphType] = useState("A");

  Chart.register(LinearScale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full text-center mb-4">
        <div className="flex items-center justify-center">
          <h1 className="mb-0 mr-4">Activity & Calorie Intake Analysis</h1>
          <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
            <option value="A">Graph A</option>
            <option value="B">Graph B</option>
            <option value="C">Graph C</option>
          </select>
        </div>
      </div>
      
      <Scatter
        data={getData(graphType)}
        options={{
          plugins: {
            title: {
              display: true,
              
              font: {
                size: 40
              }
            }},
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Calories Burned',
                  font: {
                    size: 15
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Calories Consumed',
                  font: {
                    size: 15
                  }
                }
              }
            },
        }}
      />
    </main>
  );
};

export default IntakePage;
