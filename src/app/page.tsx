import { Amplify } from "aws-amplify";
import { Knewave } from "next/font/google";
import Link from "next/link";

const knewave = Knewave({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono lg:flex" />

      <div className={knewave.className}>
        <h1 className="text-9xl">ATHLEAT</h1>
        <h3 className="text-center text-4xl py-6">Eat. Move. Feel.</h3>
      </div>

      <div className="flex justify-center space-x-4 w-full lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        {/* <Link
          href="/home"
          className=" rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Been Here{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {"Already know what you're doing? Go straight to your dashboard!"}
          </p>
        </Link> */}

        <Link
          href="/auth"
          className=" rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Get Started{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {"Sign up and integrate your data!"}
          </p>
        </Link>
      </div>
    </main>
  );
}
