/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { AnyRouter } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { FastifyInstance, FastifyRegisterOptions } from "fastify";

import { appRouter } from "@acme/api";

import { createContext } from "~/context";

export const trpcPlugin = (
  server: FastifyInstance,
  _: FastifyRegisterOptions<AnyRouter>,
  done: (err?: Error) => void,
) => {
  server.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc",
    trpcOptions: { router: appRouter, createContext },
  });

  done();
};
