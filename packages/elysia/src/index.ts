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
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Elysia } from "elysia";

import { appRouter } from "@acme/api";
import { createTRPCContext } from "@acme/api/src/trpc";

export const trpcCreateContext = (opts: FetchCreateContextFnOptions) =>
  createTRPCContext({
    headers: new Headers({
      "x-trpc-source": "elysia",
    }),
  });

const app = new Elysia().use(cors()).use(cookie()).use(swagger());

export const trpcAppWithContext = (contextCreator: typeof trpcCreateContext) =>
  app.use(
    trpc(appRouter, {
      endpoint: "/api/trpc",
      createContext: contextCreator,
    }),
  );
