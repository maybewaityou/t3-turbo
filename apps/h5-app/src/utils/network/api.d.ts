/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export interface AdaptiveResponseData<T> {
  readonly code?: number
  readonly msg?: string
  readonly data?: T
  readonly success?: boolean

  // 以下字段为兼容老接口
  readonly retCode?: string
  readonly retMsg?: string
  readonly result?: T
}

export interface ResponseData<T> {
  readonly code: number
  readonly msg: string
  readonly data: T
  readonly success: boolean
}
