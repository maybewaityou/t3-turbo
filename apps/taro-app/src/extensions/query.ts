/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { UseTRPCQueryResult } from '@trpc/react-query/shared'

export function queryMatch<T, R>(
  query: UseTRPCQueryResult<R, any>,
  onLoading: () => T,
  onFailure: (error: Error) => T,
  onSuccess: (data: R) => T,
): T {
  const { isLoading, isError, error, data } = query
  if (isLoading) return onLoading()
  if (isError) return onFailure(error)

  return onSuccess(data as R)
}
