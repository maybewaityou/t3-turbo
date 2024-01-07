/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastify from "fastify";

import { env } from "~/env.js";
import { trpcPlugin } from "./plugins/trpc";
import { apiRoutes } from "./router";

const server = fastify({
  maxParamLength: 5000,
  logger: {
    level: "info",
  },
});

server.register(cors, {
  origin: "*",
  credentials: true,
});
server.register(helmet);
// await server.register(import('@fastify/compress'), {})
server.register(trpcPlugin);
server.register(apiRoutes, { prefix: "/api" });

async function start() {
  try {
    await server.listen({ host: "0.0.0.0", port: env.PORT });
  } catch (err: any) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
