"use client";
import { ChatgptService } from "@/app/integrations/openai/ChatgptService";
import { NutritionBody } from "@/app/integrations/types";
import { generateClient } from "aws-amplify/api";
import React, { ChangeEvent, FormEvent, useState } from "react";

function NutritionForm() {
  // State to keep track of the input values
  const [formData, setFormData] = useState<NutritionBody>({
    user_id: "",
    meal_date: "",
    meal_time: "",
    food: "",
  });
  const client = generateClient();

  // Handler for input value changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const currentUserID = localStorage.getItem("currentUserID");
    e.preventDefault();
    if (!currentUserID) {
      console.log("No user id");
    } else {
      const service = new ChatgptService();
      service.fetch(formData);

      // Clear the form
      setFormData({
        user_id: currentUserID ?? "",
        meal_date: "",
        meal_time: "",
        food: "",
      });
    }
  };

  const setDateTimeToNow = () => {
    const now = new Date();
    const meal_date = now.toISOString().split("T")[0];
    const meal_time = now.toTimeString().split(" ")[0];
    setFormData((prevState) => ({
      ...prevState,
      meal_date,
      meal_time,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-md p-6 items-center">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Nutrition Form
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
              value={formData.meal_date}
              onChange={handleChange}
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
              value={formData.meal_time}
              onChange={handleChange}
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
              value={formData.food}
              onChange={handleChange}
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
