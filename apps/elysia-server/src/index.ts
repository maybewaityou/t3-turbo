/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Elysia } from "elysia";
import { httpErrorDecorator } from "elysia-http-error";

import { trpcAppWithContext } from "@acme/elysia";

import { createContext } from "~/context";
import { env } from "~/env.mjs";

const app = new Elysia()
  .use(trpcAppWithContext(createContext))
  .use(httpErrorDecorator)
  .get("/elysia", () => "Hi Elysia")
  .listen(env.PORT, ({ hostname, port }) => {
    console.log(`🦊 running at http://${hostname}:${port}`);
  });

export type App = typeof app;
