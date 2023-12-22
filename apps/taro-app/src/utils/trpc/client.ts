/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { AppRouter } from '@acme/api'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'
import { AbortControllerExt } from './adapter/AbortControllerExt'
import { fetchExt } from './adapter/FetchExt'

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
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        fetch: fetchExt,
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
  return `http://127.0.0.1:8080`
}
