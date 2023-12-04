"use client";

import React, { useRef, useEffect, useState } from "react";
import { IntakeController } from "./controller";

interface bigEffort {
  name: string,
  date: string,
  calories: number,
  duration: number,
  distance: number,
  // foodDayOf: Array<string>,
  // foodBefore: Array<string>,
  // foodAfter: Array<string>
}

const EffortPage: React.FC = () => {
  const controller = new IntakeController();
  const [filter, setFilter] = useState<string>('Calories');
  // const [stravaActivity, setStravaActivity] = useState<string>('Activity');
  // const [date, setDate] = useState<string>('Date');
  // const [time, setTime] = useState<string>('Time');
  // const [distance, setDistance] = useState<number>(0);
  const [efforts, setEfforts] = useState<Array<bigEffort>>([]);
  const [currEffort, setCurrEffort] = useState<bigEffort>({
    name: "name",
    date: "Today",
    calories: 0,
    duration: 0,
    distance: 0,
  });
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => {
    async function runManager() {
      const start = new Date();
      start.setFullYear(start.getFullYear() - 3);
      const end = new Date();
      const manager = await controller.useTrendManager(start, end);

      let map: {[key: number]: number} = {}
      manager.chartData.datasets.map((dataset, i) => {
        let param;
        if (filter === "Calories")
            param = dataset.activity.calories;
        else if (filter === "Distance")
          param = dataset.activity.distance;
        else
          param = dataset.activity.duration;
          // else  
          //   param = dataset.activity.pace;
        map[param] = i;
      });

      const sortedKeys = Object.keys(map).map(parseFloat).sort((a, b) => b - a);
      const sortedEntries: Array<[number, number]> = sortedKeys.map(key => [key, map[key]]);
      const topEntries = sortedEntries.slice(0,5);

      const effortsList: bigEffort[] = [];
      topEntries.forEach(([key, value]) => {
        const effortToGoInList: bigEffort = {
          name: "name",
          date: manager.chartData.labels[value],
          calories: manager.chartData.datasets[value].activity.calories,
          duration: manager.chartData.datasets[value].activity.duration,
          distance: manager.chartData.datasets[value].activity.distance,
          //foodDayOf: manager.chartData.datasets[value].currentDayNutrition[0]
        }
        effortsList.push(effortToGoInList);
      });

      setEfforts(effortsList);
      if (effortsList.length > 0)
        setCurrEffort(efforts[0]);
      setIdx(0);
    }
    
    runManager();
  }, [filter]);

  const flipPage = (forward: boolean) => {
    if (!forward && idx == 0)
      return;
    else if ((forward && idx + 1 == efforts?.length) || efforts.length == 0)
      return;

    let currIdx = idx;
    if (forward) {
      setIdx(idx+1);
      currIdx++;
    }
    else {
      setIdx(idx-1);
      currIdx--;
    } 

    setCurrEffort(efforts[currIdx]);
    
    

    //console.log("After", idx);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-semibold mr-4">Big Effort Analysis</h1>
        <label className="mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-800 p-2 rounded-md"
        >
          <option value="Calories">Calories</option>
          <option value="Duration">Duration</option>
          <option value="Distance">Distance</option>
        </select>
      </div>

      <div className="border border-gray-800 bg-gray-200 p-8 rounded-lg shadow-md mb-8 flex">
        {/* Parameters Column */
        <div className="flex flex-col mr-8">
          <div className="mb-2">{currEffort.name}</div>
          <div className="mb-2">Date: {currEffort.date}</div>
          <div className="mb-2">Duration: {currEffort.duration}min</div>
          <div className="mb-2">Distance: {currEffort.distance}km</div>
        </div> }
        

        {/* Three Larger Boxes with spacing */}
        <div className="flex">
          <div className="bg-clear border border-gray-800 p-12 rounded-md mr-4">
            <div className="text-lg font-semibold mb-4">Night Before</div>
            <ul className="list-disc">
              <li>Lasagn Dinner</li>
              <li>Red apple</li>
              <li>Steamed Broccoli</li>
            </ul>
          </div>

          <div className="bg-clear border border-gray-800 p-12 rounded-md mr-4">
            <div className="text-lg font-semibold mb-4">Day Of</div>
            <ul className="list-disc">
              <li>8 oz ribeye</li>
              <li>Bowl of white rice</li>
              <li>5 egg omelette</li>
            </ul>
          </div>

          <div className="bg-clear border border-gray-800 p-12 rounded-md">
            <div className="text-lg font-semibold mb-4">Morning After</div>
            <ul className="list-disc">
              <li>red apple</li>
              <li>Life Granola bar</li>
              <li>2 scrambled eggs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons below the big box with matching styles */}
      <div className="flex justify-between">
        <button className="border border-gray-800 bg-gray-200 text-gray-800 p-2 rounded-md mr-2" onClick={() => flipPage(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="border border-gray-800 bg-gray-200 text-gray-800 p-2 rounded-md ml-2" onClick={() => flipPage(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EffortPage;


