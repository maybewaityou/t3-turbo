/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { createTRPCContext } from "@acme/api";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createContext = (opts: FetchCreateContextFnOptions) =>
  createTRPCContext({
    headers: new Headers({
      "x-trpc-source":
        opts.req.headers?.get("x-trpc-source") ?? "elysia-server",
    }),
  });

export type Context = Awaited<ReturnType<typeof createContext>>;
