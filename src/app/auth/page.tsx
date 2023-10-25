"use client";

import { FormEvent, useState } from "react";
import { signIn, signUp, confirmSignUp } from "aws-amplify/auth";

const AuthPage = () => {
  // State hooks for login, registration, and confirmation
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [user, setUser] = useState(null); // To hold user data after sign-up
  const [errorMessage, setErrorMessage] = useState("");

  // Handler for the form submission event
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(""); // Clear any previous errors

    try {
      if (isLogin) {
        // Sign in the user
        await signIn({ username: email, password });
        // TODO: handle redirection or state updates as necessary
      } else {
        if (!user) {
          // Sign up the user
          const newUser = await signUp({
            username: email,
            password,
          });
          //TODO: setUser(newUser); // Save the user to state
          // After this point, you would probably want to instruct the user to check their email for the confirmation code.
        } else {
          // Confirm the code provided by the user
          await confirmSignUp({ username: email, confirmationCode });
          // Here, you could redirect to the login page or automatically log the user in.
          // We'll clear the form and redirect to login for simplicity.
          setIsLogin(true);
          setUser(null);
          setPassword("");
          setConfirmationCode("");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message || "An error occurred during authentication"
        );
      } else {
        console.log("Unrecognized Error: ", error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 text-black">
      <div className="p-10 bg-white rounded-lg shadow-md w-full max-w-md">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Confirm Sign Up
            </h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700">Confirmation Code:</span>
                <input
                  className="mt-1 p-2 w-full border rounded-md"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                />
              </label>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none focus:ring"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center ">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-gray-700">Email:</span>
                <input
                  type="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="block mb-6">
                <span className="text-gray-700">Password:</span>
                <input
                  type="password"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none focus:ring"
                >
                  {isLogin ? "Login" : "Create account"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-blue-500 hover:text-blue-700 rounded-md focus:outline-none focus:ring"
                  onClick={() => {
                    // Clear form fields when toggling between login and sign-up
                    setPassword("");
                    setEmail("");
                    setConfirmationCode("");
                    setIsLogin(!isLogin);
                  }}
                >
                  {isLogin
                    ? "Need to create an account?"
                    : "Already have an account?"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
