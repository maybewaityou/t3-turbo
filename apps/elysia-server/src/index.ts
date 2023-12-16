/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

import { Elysia } from "elysia";

import { trpcAppWithContext } from "@acme/elysia";

import { createContext } from "~/context";
import { env } from "~/env.mjs";

const app = new Elysia()
  .use(trpcAppWithContext(createContext))
  .listen(env.PORT, ({ hostname, port }) => {
    console.log(`🦊 running at http://${hostname}:${port}`);
  });
