"use client";

import React, { useRef, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { TimelineController } from "./controller";
import Chart, {
  ChartConfiguration,
  LinearScale,
  ChartData,
  Point,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const TimelinePage: React.FC = () => {
  const client = generateClient();
  const controller = new TimelineController(client);
  const start = new Date();
  const [date, setDate] = useState<string>(start.toISOString());
  const [combinedData, setCombinedData] = useState<ChartData<"bar", (Point)[], unknown>>({
    datasets: [],
  });

  function timeStringToMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
      throw new Error("Invalid time string format");
    }
  
    return hours * 60 + minutes;
  }

  useEffect(() => {
    async function runTimingManager() {
      const currDate = new Date(date);
      const manager = await controller.useTimelineManager(currDate);

      const activityDataset: Point[] = [];
      const nutrientDataset: Point[] = [];
      const labels: string[] = [];

      manager.events.forEach((e) => {
        const mins = timeStringToMinutes(e.details.time);
        const point: Point = {
          x: mins,
          y: e.details.calories,
        } as Point;
        if (e.type === "Activity") activityDataset.push(e.details.calories);
        else if (e.type === "Nutrient") nutrientDataset.push(e.details.calories);
        labels.push(e.details.time);
      })

      const combinedDataset = {
        labels: labels,
        datasets: [
          {
            label: "Activity",
            data: activityDataset,
            backgroundColor: "#FF6384",
          },
          {
            label: "Nutrition",
            data: nutrientDataset,
            backgroundColor: "#36A2EB",
          }
        ]
      }

      setCombinedData(combinedDataset);
    }

    runTimingManager();
  }, [date]);

  Chart.register(LinearScale);

  return (
    <main className="flex  flex-col min-h-screen">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-3xl font-semibold mr-4">Timeline</h1>
        
        <label className="mr-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-800 p-2 rounded-md"
        />
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8 flex" >
        <div className="flex-1 max-h-85" >
          <Bar
            data={combinedData}
            options={{
              plugins: {
                title: {
                  display: false
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Calories",
                    font: {
                      size: 15,
                    },
                  },
                },
                x: {
                  labels: [
                    "12:00AM", "12:00PM", "12:00AM"
                  ]
                }
              },
              // responsive: true, // Enable responsiveness
              // maintainAspectRatio: false, // Disable maintaining aspect ratio
              // height: 400, // Set the desired height
              // width: 600, // Set the desired width
            }}
            
          />
        </div>

        
      </div>
    </main>
      
  );
};

export default TimelinePage;

// plugins: {
//   title: {
//     display: true,
//     text: "Exercise vs Meal Times",
//     font: {
//       size: 40,
//     },
//   },
// },
// scales: {
//   y: {
//     title: {
//       display: true,
//       text: activityFilter,
//       font: {
//         size: 15,
//       },
//     },
//   },
// },

{/* <Bar
            data={combinedData}
            options={{
              plugins: {
                title: {
                  display: false
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Calories",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
            }}
          /> */}


