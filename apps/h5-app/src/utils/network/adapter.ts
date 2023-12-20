/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { AxiosResponse } from 'axios'
import { Either } from 'fp-ts/Either'

import { match } from '@/extensions/fp'
import type { AdaptiveResponseData, ResponseData } from './api.d'

export function isSuccess<T>(response: ResponseData<T>) {
  return response.success
}

export function postResponse<T>(
  url: string,
  either: Either<Error, AxiosResponse<AdaptiveResponseData<T>>>,
): Either<Error, T> {
  return match(
    either,
    (error) => {
      logger.withTag('api').error('== url ===>>>>', url)
      logger.withTag('api').error('== error ===>>>>', error.message)
      return left(error)
    },
    (response: AxiosResponse<AdaptiveResponseData<T>>) => {
      const adaptivedData = adaptiveResponse(response.data)
      if (!isSuccess(adaptivedData)) return left(Error(adaptivedData.msg))

      return right(adaptivedData.data)
    },
  )
}

function adaptiveResponse<T>(response: AdaptiveResponseData<T>): ResponseData<T> {
  if (response.retCode) {
    const success = response.retCode === '000000'
    return {
      success,
      code: success ? 200 : 1001,
      msg: response.retMsg!,
      data: response.result!,
    }
  }

  return {
    success: response.success!,
    code: response.code!,
    msg: response.msg!,
    data: response.data!,
  }
}
