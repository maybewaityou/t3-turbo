/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { createTRPCContext } from '@acme/api'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createContext = () =>
  createTRPCContext({
    headers: new Headers({
      'x-trpc-source': 'fastify-server',
    }),
  })

export type Context = Awaited<ReturnType<typeof createContext>>
