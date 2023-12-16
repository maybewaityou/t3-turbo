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

import { createContext } from "~/utils/server";

export type Context = Awaited<ReturnType<typeof createContext>>;

const app = new Elysia()
  .use(cors())
  .use(cookie())
  .use(swagger())
  .use(
    trpc(appRouter, {
      endpoint: "/api/trpc",
      createContext,
    }),
  );

export const GET = app.handle;
export const POST = app.handle;
