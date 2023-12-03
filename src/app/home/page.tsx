"use client";

import React from "react";
import { Knewave } from "next/font/google";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { FetchBody } from "../integrations/types";
import { StravaService } from "../integrations/strava/StravaService";

const knewave = Knewave({ weight: "400", subsets: ["latin"] });

const HomePage: React.FC = () => {
  const router = useRouter();

  async function handleSync() {
    try {
      const id = localStorage.getItem("currentUserID");
      console.log(id);
      if (id != null) {
        const dataBody: FetchBody = {
          id: id,
        };
        const service = new StravaService();
        console.log("fetching");
        const response = await service.fetch(dataBody);
        console.log("Done");
      } else {
        throw new Error("No user id or code");
      }
    } catch (error) {
      console.log("error linking:", error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      router.replace("/auth/sign-in");
    } catch (error) {
      console.log("error signing out:", error);
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center">
      {/* Top section */}
      <div className="flex items-center w-full p-4 bg-gray-200">
        <div className="flex text-x2l items-center">
          <button className={knewave.className}>ATHLEAT</button>
        </div>
        <div className="text-xl flex-grow text-center font-bold"></div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-white text-black border border-black px-4 py-2 rounded-md"
            onClick={() => {
              router.push("/forms/nutrition");
            }}
          >
            Log Your Meals
          </button>
          <button
            className="bg-white text-black border border-black px-4 py-2 rounded-md"
            onClick={() => {
              handleSync();
            }}
          >
            Sync
          </button>
          <form action={handleSignOut}>
            <button
              className="bg-white text-black w-10 h-10 flex items-center justify-center rounded-full"
              type="submit"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Main content split into two halves */}
      <div className="w-4/5 flex flex-col items-center">
        <div className=" flex justify-between">
          <div className="w-1/2 p-4">
            <button className="bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black h-full w-full">
              <div>Timeline</div>
              <div className="text-lg text-gray-500">
                See the combined timeline of your fitness and nutrition habits
              </div>
            </button>
          </div>
          <div className="w-1/2 p-4">
            <button className="bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black h-full w-full">
              <div>Coach</div>
              <div className="text-lg text-gray-500">
                Get coached on your data
              </div>
            </button>
          </div>
        </div>
        {/* Black dividing line */}
        <div className="w-4/5 border-t border-black my-4"></div>
        <div className="text-xl items-center font-bold">Trends</div>

        <div className="text-xl items-center font-bold"></div>
        <div className="w-full center flex justify-between mt-8">
          <div className="w-1/4 p-4">
            <button className="bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black">
              <div>Consistency Across Activities</div>
              <div className="text-lg text-gray-500">
                Explore how your workout patterns align with your dietary logs.
                Do you see trends in both your physical activities and eating
                habits?
              </div>
            </button>
          </div>
          <div className="w-1/4 p-4">
            <button className="bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black">
              <div>Activity and Calorie Intake Analysis</div>
              <div className="text-lg text-gray-500">
                Examine how your daily exercises might influence your caloric
                consumption. Is there a correlation between more active days and
                increased intake?
              </div>
            </button>
          </div>
          <div className="w-1/4 p-4">
            <button className="bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black">
              <div>Exercise vs. Meal Times</div>
              <div className="text-lg text-gray-500">
                Understand when users tend to exercise (morning, afternoon,
                evening) and when they consume most of their calories.
              </div>
            </button>
          </div>
          <div className="w-1/4 p-4">
            <button className="bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black">
              <div>Nutritions Role in Recovery</div>
              <div className="text-lg text-gray-500">
                Study the interval between intense activities and consider if
                nutritional choices play a role. Are there dietary patterns that
                aid recovery?
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
