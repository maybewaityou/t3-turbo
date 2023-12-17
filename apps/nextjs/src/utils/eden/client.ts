/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { edenTreaty } from "@elysiajs/eden";

import { App } from "@acme/elysia-server";

import { env } from "~/env.mjs";

export const client = edenTreaty<App>(
  `http://${env.SERVER_HOST}:${env.SERVER_PORT}`,
);
