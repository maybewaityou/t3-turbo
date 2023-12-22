/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { cache } from "react";
import { Elysia } from "elysia";

import { createTRPCContext } from "@acme/api/src/trpc";
import { trpcAppWithContext } from "@acme/elysia";

const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      "x-trpc-source": "elysia",
    }),
  });
});

const app = new Elysia().use(trpcAppWithContext(createContext));

export const GET = app.handle;
export const POST = app.handle;
