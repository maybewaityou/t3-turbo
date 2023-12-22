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
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  health: healthRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
