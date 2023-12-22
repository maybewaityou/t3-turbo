/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import Taro from '@tarojs/taro'
import { ResponseExt } from './ResponseExt'

export function fetchExt(input) {
  return new Promise((resolve, reject) =>
    Taro.request({
      url: `${input}`,
      success: (res) => {
        resolve(new ResponseExt(res))
      },
      fail: reject,
    }),
  ) as Promise<any>
}
