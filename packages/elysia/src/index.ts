/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { etag } from "@bogeychan/elysia-etag";
import { cookie } from "@elysiajs/cookie";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import { httpErrorDecorator } from "elysia-http-error";

import { appRouter } from "@acme/api";
import { createTRPCContext } from "@acme/api/src/trpc";

export const trpcCreateContext = () => {
  return createTRPCContext({
    headers: new Headers({
      "x-trpc-source": "elysia",
    }),
  });
};

const app = new Elysia()
  .use(etag())
  .use(cors())
  .use(helmet())
  .use(cookie())
  .use(swagger())
  .use(httpErrorDecorator);

export const trpcAppWithContext = (contextCreator: typeof trpcCreateContext) =>
  app.use(
    trpc(appRouter, {
      endpoint: "/api/trpc",
      createContext: contextCreator,
    }),
  );
