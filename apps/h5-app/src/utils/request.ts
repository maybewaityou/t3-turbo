/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Either } from 'fp-ts/Either'

import ApiBuilder from './network/ApiBuilder'
import { postResponse } from './network/adapter'
import type { ResponseData } from './network/api.d'

const api = new ApiBuilder()
  .setBaseURL(import.meta.env.VITE_APP_BASE_URL)
  .setPrefix('/api')
  .setTimeout(1000 * 5)
  .build()

export async function apiGet<T>(url: string, params?: any): Promise<Either<Error, T>> {
  const either = await toE(api.get<ResponseData<T>>(url, { params }))
  return postResponse<T>(url, either)
}

export async function apiPost<T>(url: string, params: any): Promise<Either<Error, T>> {
  const either = await toE(
    api.post<ResponseData<T>>(url, params, {
      headers: {
        // Authorization: `Bearer ${getQueryString('token')}`
      },
    }),
  )
  return postResponse<T>(url, either)
}

export async function apiPostFormData<T>(url: string, params: any): Promise<Either<Error, T>> {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key])
  })

  const either = await toE(
    api.post<ResponseData<T>>(url, formData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // Authorization: `Bearer ${getQueryString('token')}`
      },
    }),
  )
  return postResponse<T>(url, either)
}
