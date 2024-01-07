/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cache } from "react";
import { Elysia } from "elysia";

import { createTRPCContext } from "@acme/api/src/trpc";
import { trpcAppWithContext } from "@acme/elysia";

const createContext = cache((opts: FetchCreateContextFnOptions) =>
  createTRPCContext({
    headers: opts.req.headers,
  }),
);

const app = new Elysia().use(trpcAppWithContext(createContext));

export const GET = app.handle;
export const POST = app.handle;
