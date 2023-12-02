"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { signIn } from "aws-amplify/auth";
import { cookiesClient } from "@/utils/amplifyServerUtils";
import { createUser } from "@/graphql/mutations";
import { User } from "@/models";
import { DataStore } from "aws-amplify/datastore";
import { generateClient } from "aws-amplify/api";
import { datastoreService } from "@/app/DatastoreService";

function SignIn() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const client = generateClient();

  async function handleSignIn() {
    try {
      const auth = await signIn({
        username: user.email,
        password: user.password,
      });
      const existingUser = await DataStore.query(User, (u) =>
        u.email.eq(user.email)
      );

      if (existingUser.length) {
        localStorage.setItem("currentUserID", existingUser[0].id);
        if (existingUser[0].stravaAccessToken) {
          router.push(`/home`);
          return;
        } else {
          router.push(`/auth/strava`);
          return;
        }
      } else {
        const { data } = await client.graphql({
          query: createUser,
          variables: {
            input: {
              email: user.email,
              name: user.password,
            },
          },
        });
        localStorage.setItem("currentUserID", data.createUser.id);
        router.push(`/auth/strava`);
        return;
      }
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(user);
            handleSignIn();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== "") {
                    setUser({ ...user, email: val });
                  }
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val !== "") {
                    setUser({ ...user, password: val });
                  }
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/auth/sign-up"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
}

export default SignIn;