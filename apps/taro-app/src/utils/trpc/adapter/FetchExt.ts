/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import Taro from '@tarojs/taro'
import { TRPCClientError } from '@trpc/client'
import { ResponseExt } from './ResponseExt'

export function fetchExt(input) {
  return new Promise((resolve, reject) =>
    Taro.request({
      url: `${input}`,
      success: (res) => {
        resolve(new ResponseExt(res))
      },
      fail: (err) => {
        reject(new TRPCClientError(err.errMsg))
      },
    }),
  ) as Promise<any>
}
