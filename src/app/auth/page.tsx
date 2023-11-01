"use client";

import Spinner from '../components/Spinner';
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "@/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });

const AuthPage = () => {
  // State hooks for login, registration, and confirmation
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [user, setUser] = useState<boolean>(false); // To hold user data after sign-up
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handler for the form submission event
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(""); // Clear any previous errors


    try {
      //setErrorMessage("");
      if (isLogin) {
        // Sign in the user
        const result = await Auth.signIn({ username: email, password });
        // if (result) {

        setLoading(true);
        router.push("/home");
        //setLoading(false);
        // else => setErrorMessage("Incorrect username or password");
        // TODO: handle redirection or state updates as necessary
      } else {
        if (!user) {
          // Sign up the user
          const newUser = await Auth.signUp({
            username: email,
            password,
            attributes: {
              email,
              preferred_username: email,
              gender: "Male",
              name: "Athleat User",
            },
          });
          
          setUser(true);
          //TODO: setUser(newUser); // Save the user to state
          // After this point, you would probably want to instruct the user to check their email for the confirmation code.
        } else {
          //TODO: Send the Strava token to the backend
          //Backend: use the token to get the user's data from Strava
          //Backend: save the token for future use
          //const token = Token;
          // if (success)=> goTo("/home");

          // Here, you could redirect to the login page or automatically log the user in.
          // We'll clear the form and redirect to login for simplicity.
          setIsLogin(true);
          setPassword("");
          setConfirmationCode("");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message || "An error occurred during authentication"
        );
        setUser(false);
      } else {
        console.log("Unrecognized Error: ", error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 text-black">
      {loading ? <Spinner /> : null}
      <div className="p-10 bg-white rounded-lg shadow-md w-full max-w-md">
        {user ? (
          //Strava integration view
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Integrate with Strava
            </h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none focus:ring"
                  onClick={() => window.open("https://www.strava.com/")}
                >
                  Link Your Account
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
                    // also clear error messages
                    setErrorMessage("");
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
