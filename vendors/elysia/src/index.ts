/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cookie } from "@elysiajs/cookie";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";

import { appRouter, createTRPCContext } from "@acme/api";

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
