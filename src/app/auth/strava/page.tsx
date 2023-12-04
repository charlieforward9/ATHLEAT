"use client";
import React from "react";
import { useRouter } from "next/navigation";

function AuthStrava() {
  const router = useRouter();

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Authorize Strava Access
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(
              "https://www.strava.com/oauth/authorize?client_id=115059&response_type=code&redirect_uri=http://localhost:3001/auth/strava/link&approval_prompt=force&scope=read,activity:read_all"
            );
          }}
        >
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Authorize
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AuthStrava;
