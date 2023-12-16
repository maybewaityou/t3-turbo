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
      "x-trpc-source": "rsc",
    }),
  });
});

function httpLink(): any {
  if (env.USE_FASTIFY === "true")
    return httpBatchLink({ url: `${getBaseUrl()}/api/trpc` });

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
