/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { cookie } from "@elysiajs/cookie";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";

import { appRouter } from "@acme/api";
import { createTRPCContext } from "@acme/api/src/trpc";

export const trpcCreateContext = () => {
  return createTRPCContext({
    headers: new Headers({
      "x-trpc-source": "elysia",
    }),
  });
};

export const trpcAppWithContext = (contextCreator: typeof trpcCreateContext) =>
  new Elysia()
    .use(cors())
    .use(cookie())
    .use(swagger())
    .use(
      trpc(appRouter, {
        endpoint: "/api/trpc",
        createContext: contextCreator,
      }),
    );
