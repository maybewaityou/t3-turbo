/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { edenTreaty } from "@elysiajs/eden";

import { App } from "@acme/elysia-server";

import { env } from "~/env.js";

export const eden = edenTreaty<App>(
  `http://${env.SERVER_HOST}:${env.SERVER_PORT}`,
);
