/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { AbortControllerExt } from '@/extensions/AbortController'
import type { AppRouter } from '@acme/api'
import Taro from '@tarojs/taro'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'

global.AbortController = AbortControllerExt as any
global.fetch = (input) => {
  console.log('input 222', input)
  return new Promise((resolve, reject) =>
    Taro.request({
      url: `${input}`,
      success: resolve,
      fail: reject,
    }),
  ) as Promise<any>
}

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
        // fetch: (input) => {
        //   console.log('input', input)
        //   return new Promise((resolve, reject) =>
        //     Taro.request({
        //       url: `${input}`,
        //       success: resolve,
        //       fail: reject,
        //     }),
        //   ) as Promise<any>
        // },
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
