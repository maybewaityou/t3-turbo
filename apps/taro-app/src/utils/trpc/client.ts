/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { AbortControllerExt } from '@/extensions/AbortController'
import type { AppRouter } from '@acme/api'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'

global.AbortController = AbortControllerExt as any

export const api = createTRPCNext<AppRouter>({
  config: () => ({
    transformer: superjson,
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      unstable_httpBatchStreamLink({
        url: `${getBaseUrl()}/api/trpc`,
        fetch: (input) => {
          return Promise.resolve(input as any)
        },
        headers() {
          const headers = new Map()
          headers.set('x-trpc-source', 'taro-react')
          return Object.fromEntries(headers)
        },
      }),
    ],
  }),
})

export { type RouterInputs, type RouterOutputs } from '@acme/api'

export const getBaseUrl = () => {
  return `http://localhost:8080`
}
