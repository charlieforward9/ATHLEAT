"use client";
import { ChatgptService } from "@/app/integrations/openai/ChatgptService";
import { generateClient } from "aws-amplify/api";
import React, { FormEvent, useState } from "react";
import { Knewave } from "next/font/google";

const knewave = Knewave({ weight: "400", subsets: ["latin"] });

function NutritionForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [food, setFood] = useState("");

  const client = generateClient();

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const currentUserID = localStorage.getItem("currentUserID");
    e.preventDefault();
    if (!currentUserID) {
      throw new Error("No user id");
    } else {
      const service = new ChatgptService();
      service.fetch({
        user_id: currentUserID,
        meal_date: date,
        meal_time: time,
        food: food,
      });

      alert("Nutrition event submitted!");

      // Clear the form
      setDate("");
      setTime("");
      setFood("");
    }
  };

  const setDateTimeToNow = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    setDate(date);
    setTime(time);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-6 items-center">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          <div className={knewave.className}>Nutrition Form</div>
        </h1>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={setDateTimeToNow}
          >
            Now
          </button>
        </div>

        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time:
            </label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              step="1"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Food:
            </label>
            <input
              type="text"
              name="food"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NutritionForm;
