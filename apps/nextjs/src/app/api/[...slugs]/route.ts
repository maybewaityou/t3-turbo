/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { cache } from "react";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Elysia } from "elysia";

import { createTRPCContext } from "@acme/api/src/trpc";
import { trpcAppWithContext } from "@acme/elysia";

const createContext = cache((opts: FetchCreateContextFnOptions) => {
  return createTRPCContext({
    headers: new Headers({
      "x-trpc-source":
        opts.req.headers?.get("x-trpc-source") ?? "nextjs-server",
    }),
  });
});

const app = new Elysia().use(trpcAppWithContext(createContext));

export const GET = app.handle;
export const POST = app.handle;
