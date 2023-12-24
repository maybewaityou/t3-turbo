/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import Taro from "@tarojs/taro";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import type { AppRouter } from "@acme/api";
import { AbortControllerExt, fetchTaroAdapter } from "@acme/trpc-taro";

global.AbortController = AbortControllerExt as any;

export const api = createTRPCNext<AppRouter>({
  config: () => ({
    transformer: superjson,
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        fetch: (input, options) =>
          fetchTaroAdapter(input, options)(Taro.request),
        headers() {
          const headers = new Map();
          headers.set("x-trpc-source", "taro-react");
          headers.set(
            "authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3MDMzOTA0MDUsImV4cCI6MTcwMzk5NTIwNX0.g4jMoqrvADNxIutP-bPLtFVYsC2CdJZb_Ja4MkGXjn4",
          );
          return Object.fromEntries(headers);
        },
      }),
    ],
  }),
});

export { type RouterInputs, type RouterOutputs } from "@acme/api";

export const getBaseUrl = () => {
  return `http://127.0.0.1:8080`;
};
