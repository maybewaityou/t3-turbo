/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
// import { AnyRouter } from '@trpc/server'
import { FastifyInstance, FastifyRegisterOptions } from "fastify";

export const apiRoutes = (
  server: FastifyInstance,
  _: FastifyRegisterOptions<any>,
  done: (err?: Error) => void,
) => {
  server.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  done();
};
