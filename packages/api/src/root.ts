/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { authRouter } from "./router/auth";
import { healthRouter } from "./router/health";
import { postRouter } from "./router/post";
import { testRouter } from "./router/test";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  health: healthRouter,
  test: testRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
