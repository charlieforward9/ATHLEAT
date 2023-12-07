"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthBody } from "@/app/integrations/types";
import { StravaService } from "@/app/integrations/strava/StravaService";

function AuthStrava() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleLink() {
    try {
      const id = localStorage.getItem("currentUserID");
      const code = searchParams.get("code");
      if (id != null && code != null) {
        const authBody: AuthBody = {
          id: id,
          code: code.toString(),
        };
        const service = new StravaService();
        const response = await service.authenticate(authBody);
        router.push(`/user/home`);
      } else {
        throw new Error("No user id or code");
      }
    } catch (error) {
      console.log("error linking:", error);
    }
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sync with Strava
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleLink();
          }}
        >
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Access Tokens
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AuthStrava;
