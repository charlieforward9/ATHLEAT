"use client";

import { MoodEventJson } from "@/app/types";
import { createEvent } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import React, { FormEvent, useState } from "react";
import { Knewave } from "next/font/google";

const knewave = Knewave({ weight: "400", subsets: ["latin"] });

enum Mood {
  "Very Bad" = 1,
  "Bad",
  "Neutral",
  "Good",
  "Very Good",
}

function NutritionForm() {
  const client = generateClient();

  // State to keep track of the input values
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mood, setMood] = useState(5);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userID = localStorage.getItem("currentUserID");
    if (userID === null) {
      alert("You must be logged in to submit a mood event");
      return;
    }
    const moodEventJSON: MoodEventJson = {
      date: date,
      time: time,
      moodIndex: mood,
    };
    client.graphql({
      query: createEvent,
      variables: {
        input: {
          userID: userID,
          type: "mood",
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString().split("T")[1].split(".")[0],
          eventJSON: JSON.stringify(moodEventJSON),
        },
      },
    });

    alert("Mood event submitted!");
    // Clear the form
    setDate("");
    setTime("");
    setMood(5);
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          <div className={knewave.className}>Mood Form</div>
        </h1>

        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={setDateTimeToNow}
            >
              Now
            </button>
          </div>
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
          <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mood:
            </label>
            <div className="flex flex-row space-x-5">
              <input
                type="range"
                min="1"
                max="5"
                name="mood"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                required
                className="shadow  w-2/3 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-xl min-w-sm w-1/3 text-center">{Mood[mood]}</p>
            </div>
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
