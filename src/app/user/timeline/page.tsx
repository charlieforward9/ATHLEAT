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
      let duration = 10;

      manager.events.forEach((e) => {
        const mins = timeStringToMinutes(e.details.time);
        const point: Point = {
          x: mins,
          y: e.details.calories
        } as Point;
        if (e.type === "Activity") {
          activityDataset.push(point);
          duration = e.details.duration;
          //labels.push(`Date: ${e.details.date}, Time: ${e.details.time}, Activity Type: ${e.details.activityType}, Duration: ${e.details.duration}, Calories: ${e.details.calories}, Distance: ${e.details.distance}, Pace: ${e.details.pace}`);
          labels.push("Duration: " + duration + "min");
        } 
        else if (e.type === "Nutrient") {
          nutrientDataset.push(point);
          labels.push("Duration: 20min");
        }
      })

      const combinedDataset = {
        labels: labels,
        datasets: [
          {
            label: "Activity",
            data: activityDataset,
            backgroundColor: "#FF6384",
            barThickness: duration
          },
          {
            label: "Nutrition",
            data: nutrientDataset,
            backgroundColor: "#36A2EB",
            barThickness: 20
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
        <div className="flex-1" style={{maxHeight: "85%", display: "flex", justifyContent: "center"}}>
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
                  grid: {
                    display: false, // Remove y-axis grid lines
                  },
                },
                x: {
                  type: 'linear',
                  title: {
                    display: true,
                    text: "Time of Day",
                    font: {
                      size: 15,
                    },
                  },
                  grid: {
                    display: false, // Remove x-axis grid lines
                  },
                  ticks: {
                    callback: (value, index, values) => {
                      // Use this callback to customize the displayed labels on the x-axis
                      // For example, you can convert minutes to HH:mm format
                      const hours = Math.floor(value as number / 60);
                      const minutes = value as number % 60;
                      const ampm = hours >= 12 ? 'PM' : 'AM';
                      const formattedHours = hours % 12 || 12;
                      return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
                    },
                  },
                },
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


