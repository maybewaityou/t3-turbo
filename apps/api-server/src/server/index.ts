import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { appRouter } from "@acme/api";

import { env } from "~/env.mjs";
import { createContext } from "../context";

const server = fastify({
  maxParamLength: 5000,
  logger: true,
});

await server.register(import("@fastify/compress"), {});
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
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
