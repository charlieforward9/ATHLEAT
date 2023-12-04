import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import config from "@/amplifyconfiguration.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});
