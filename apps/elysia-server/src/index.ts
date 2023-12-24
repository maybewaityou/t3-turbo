/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import chalk from "chalk";
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
    console.log(`🦊 running at ${chalk.green(`http://${hostname}:${port}`)}`);
  });

export type App = typeof app;
