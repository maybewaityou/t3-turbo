/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { cookies } from "next/headers";

import { createTRPCContext } from "@acme/api";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createContext = () =>
  createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "api-server",
    }),
  });

export type Context = Awaited<ReturnType<typeof createContext>>;
