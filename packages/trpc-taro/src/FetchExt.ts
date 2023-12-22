/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import Taro from "@tarojs/taro";
import { TRPCClientError } from "@trpc/client";

import { ResponseExt } from "./ResponseExt";

export function fetchTaroAdapter(input: RequestInfo | URL | string) {
  return (
    fn: (options: {
      url: string;
      success: (res: any) => void;
      fail: (err: { errMsg: string }) => void;
    }) => Promise<any>,
  ) => {
    return new Promise((resolve, reject) => {
      fn({
        url: `${input}`,
        success: (res) => {
          resolve(new ResponseExt(res));
        },
        fail: (err) => {
          reject(new TRPCClientError(err.errMsg));
        },
      });
    }) as Promise<any>;
  };
}
