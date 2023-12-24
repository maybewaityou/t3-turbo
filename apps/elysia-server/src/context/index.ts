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
export const createContext = (opts: FetchCreateContextFnOptions) => {
  console.log(opts.req.headers);

  return createTRPCContext({
    headers: opts.req.headers,
  });
};
export type Context = Awaited<ReturnType<typeof createContext>>;
