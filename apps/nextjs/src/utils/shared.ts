/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { env } from "~/env.mjs";

export const getBaseUrl = () => {
  // if (typeof window !== "undefined") return ""; // browser should use relative url
  // if (env.VERCEL_URL) return env.VERCEL_URL; // SSR should use vercel url

  // return `http://localhost:${env.SERVER_PORT}`; // dev SSR should use localhost
  return `http://${env.HOST}:${env.SERVER_PORT}`; // dev SSR should use localhost
};
