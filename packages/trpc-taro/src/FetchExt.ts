/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { TRPCClientError } from "@trpc/client";

import { ResponseExt } from "./ResponseExt";

export function fetchTaroAdapter(
  input: RequestInfo | URL | string,
  options: any,
) {
  return (
    fn: (options: {
      url: string;
      success: (res: any) => void;
      fail: (err: { errMsg: string }) => void;
    }) => Promise<any>,
  ) => {
    return new Promise((resolve, reject) => {
      fn({
        ...options,
        url: `${input}`,
        data: options.body,
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
