/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import "server-only";

import { cache } from "react";
import {
  createTRPCProxyClient,
  httpBatchLink,
  loggerLink,
  TRPCClientError,
  type Operation,
} from "@trpc/client";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import type { TRPCErrorResponse } from "@trpc/server/rpc";
import superjson from "superjson";

import { setAuthHeader } from "@acme/api";
import { appRouter } from "@acme/api/src/root";
import { createTRPCContext } from "@acme/api/src/trpc";

import { env } from "~/env.mjs";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (env.VERCEL_URL) return env.VERCEL_URL; // SSR should use vercel url

  return `http://${env.SERVER_HOST}:${env.SERVER_PORT}`; // dev SSR should use localhost
};

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      "x-trpc-source": "react-server-component",
    }),
  });
});

function httpLink(): any {
  if (env.USE_SERVER === "true")
    return httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      fetch: (input, options) => fetch(input, options),
      headers() {
        const headers = new Map();
        headers.set("x-trpc-source", "react-server-component");
        setAuthHeader(
          headers,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3MDMzOTA0MDUsImV4cCI6MTcwMzk5NTIwNX0.g4jMoqrvADNxIutP-bPLtFVYsC2CdJZb_Ja4MkGXjn4",
        );
        return Object.fromEntries(headers);
      },
    });

  /**
   * Custom RSC link that lets us invoke procedures without using http requests. Since Server
   * Components always run on the server, we can just call the procedure as a function.
   */
  return () =>
    ({ op }: { op: Operation }) =>
      observable((observer) => {
        createContext()
          .then((ctx) => {
            return callProcedure({
              procedures: appRouter._def.procedures,
              path: op.path,
              getRawInput: () => Promise.resolve(op.input),
              ctx,
              type: op.type,
            });
          })
          .then((data) => {
            observer.next({ result: { data } });
            observer.complete();
          })
          .catch((cause: TRPCErrorResponse) => {
            observer.error(TRPCClientError.from(cause));
          });
      });
}

export const api = createTRPCProxyClient<typeof appRouter>({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    httpLink(),
  ],
});
