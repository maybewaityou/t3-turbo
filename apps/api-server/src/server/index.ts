/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { appRouter } from "@acme/api";

import { env } from "~/env.mjs";
import { createContext } from "../context";

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
server.register(fastifyTRPCPlugin, {
  prefix: "/api/trpc",
  trpcOptions: { router: appRouter, createContext },
});

export async function start() {
  try {
    await server.listen({ port: env.PORT });
  } catch (err: any) {
    server.log.error(err);
    process.exit(1);
  }
}
