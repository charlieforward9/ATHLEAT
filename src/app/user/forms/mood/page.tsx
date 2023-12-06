"use client";

import { CreateEventMutationVariables } from "@/API";
import { MoodEventJson } from "@/app/types";
import { createEvent } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import React, { ChangeEvent, FormEvent, useState } from "react";

enum Mood {
  "Very Bad" = 1,
  "Bad",
  "Neutral",
  "Good",
  "Very Good",
}

function NutritionForm() {
  // State to keep track of the input values
  const [mood, setMood] = useState(5);
  const client = generateClient();

  // Handler for input value changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMood(Number(e.target.value));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userID = localStorage.getItem("currentUserID");
    if (userID === null) {
      alert("You must be logged in to submit a mood event");
      return;
    }
    const moodEventJSON: MoodEventJson = {
      date: new Date().toISOString().split("T")[0],
      time: new Date().toISOString().split("T")[1].split(".")[0],
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
    // Clear the form
    setMood(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Mood Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How are you feeling right now?:
            </label>
            <div className="flex flex-row space-x-5">
              <input
                type="range"
                min="1"
                max="5"
                name="mood"
                value={mood}
                onChange={handleChange}
                required
                className="shadow  w-2/3 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-xl min-w-sm w-1/3 text-center">{Mood[mood]}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
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
