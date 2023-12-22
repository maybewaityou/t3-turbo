/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { AppRouter } from '@acme/api'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'

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
          console.log('input', input)
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
