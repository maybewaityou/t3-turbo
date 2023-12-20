/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export function getListApi<T>() {
  return apiGet<T>('/list')
}

export function testListApi<T>() {
  return useRequest(() => apiGet<T>('/list'), {
    manual: true,
  })
}
