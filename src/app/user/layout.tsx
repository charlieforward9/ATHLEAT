"use client";

import React from 'react';
import { Knewave } from 'next/font/google';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { StravaService } from '@/app/integrations/strava/StravaService';
import { FetchBody } from '@/app/integrations/types';

const knewave = Knewave({ weight: '400', subsets: ['latin'] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  async function handleSync() {
    try {
      const id = localStorage.getItem("currentUserID");
      if (id != null) {
        const dataBody: FetchBody = {
          id: id,
        };
        const service = new StravaService();
        const response = await service.fetch(dataBody);
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
    <main className="flex flex-col min-h-screen">
      {/* Top section */}
      <div className="flex items-center w-full p-4 bg-gray-200">
        <div className="flex text-2xl items-center">
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
              className="bg-white text-black border border-black px-4 py-2 rounded-md"
              type="submit"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="">
        {/* ... Your existing main content ... */}
        {children}
      </div>
    </main>
  );
};

export default Layout;

// w-4/5 flex flex-col items-center