/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { createTRPCRouter, publicProcedure } from "../trpc";

export const healthRouter = createTRPCRouter({
  status: publicProcedure.query(() => {
    status: "ok";
  }),
  version: publicProcedure.query(() => {
    version: "1.0.0";
  }),
});
