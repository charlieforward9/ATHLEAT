"use client";

import React from "react";
import { Knewave } from "next/font/google";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { StravaService } from "@/app/integrations/strava/StravaService";
import { FetchBody } from "@/app/integrations/types";

const knewave = Knewave({ weight: "400", subsets: ["latin"] });

const HomePage: React.FC = () => {
  const router = useRouter();

  // async function handleSync() {
  //   try {
  //     const id = localStorage.getItem("currentUserID");
  //     if (id != null) {
  //       const dataBody: FetchBody = {
  //         id: id,
  //       };
  //       const service = new StravaService();
  //       const response = await service.fetch(dataBody);
  //     } else {
  //       throw new Error("No user id or code");
  //     }
  //   } catch (error) {
  //     console.log("error linking:", error);
  //   }
  // }

  // async function handleSignOut() {
  //   try {
  //     await signOut();
  //     router.replace("/auth/sign-in");
  //   } catch (error) {
  //     console.log("error signing out:", error);
  //   }
  // }

  return (
    <div className=" min-h-screen flex flex-col items-center">
      {/* Top section */}
      {/* <div className="flex items-center w-full p-4 bg-gray-200">
        <div className="flex text-x2l items-center">
          <button 
            className={knewave.className}
            onClick={() => {
              router.push("/user/home");
            }}
          >
              ATHLEAT
          </button>
        </div>
        <div className="text-xl flex-grow text-center font-bold"></div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-white text-black border border-black px-4 py-2 rounded-md"
            onClick={() => {
              router.push("/user/forms/nutrition");
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
      </div> */}

      {/* Main content split into two halves */}
      <div className="w-4/5 flex flex-col items-center">
        <div className="flex justify-between">
          <div className="w-full p-4">
            <button
              className="bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black h-full w-full   hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:text-blue-600"
              onClick={() => {
                router.push("/user/timeline");
              }}
            >
              <div className={knewave.className}>Timeline</div>
              <div className="text-lg text-gray-500">
                See the combined timeline of your fitness and nutrition habits
              </div>
            </button>
          </div>
        </div>
        {/* Black dividing line */}
        <div className="w-4/5 border-t border-black my-4"></div>
        <div className="text-xl items-center font-bold">Trends</div>

        <div className="text-xl items-center font-bold"></div>
        <div className="w-full flex justify-between items-stretch mt-8 ">
          <div className="w-1/4 p-4">
            <button
              className="h-full justify-between flex flex-col bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black   hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:text-blue-600"
              onClick={() => {
                router.push("/user/trends/consistency");
              }}
            >
              <div className={knewave.className}>Event Consistency</div>
              <div className="pt-10 text-lg text-gray-500">
                Explore how your workout patterns align with your dietary logs.
                Do you see trends in both your physical activities and eating
                habits?
              </div>
            </button>
          </div>
          <div className="w-1/4 p-4">
            <button
              className="h-full justify-between flex flex-col bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black   hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:text-blue-600"
              onClick={() => {
                router.push("/user/trends/intake");
              }}
            >
              <div className={knewave.className}>Intake Analysis</div>
              <div className="pt-10 text-lg text-gray-500">
                Examine how your exercises influence your consumption. Is there
                a correlation between more active days and increased intake?
              </div>
            </button>
          </div>
          <div className="w-1/4 p-4">
            <button
              className="h-full justify-between flex flex-col bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black   hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:text-blue-600"
              onClick={() => {
                router.push("/user/trends/timing");
              }}
            >
              <div className={knewave.className}>Exercise vs. Meal Times</div>
              <div className="pt-10 text-lg text-gray-500">
                Understand when users tend to exercise (morning, afternoon,
                evening) and when they consume most of their calories.
              </div>
            </button>
          </div>
          <div className="w-1/4 p-4">
            <button
              className="h-full justify-between flex flex-col bg-white text-2xl font-bold text-gray-800 p-6 rounded-lg border border-black   hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:text-blue-600"
              onClick={() => {
                router.push("/user/trends/effort");
              }}
            >
              <div className={knewave.className}>Big Effort Analysis</div>
              <div className="pt-10 text-lg text-gray-500">
                Explore how your workout patterns align with your dietary logs.
                Do you see trends in both your physical activities and eating
                habits?
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
