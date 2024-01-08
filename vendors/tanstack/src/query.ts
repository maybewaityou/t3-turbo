/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { DefaultError, UseQueryResult } from "@tanstack/react-query";

export function queryMatch<T, R>(
  query: UseQueryResult<R, DefaultError>,
  onLoading: () => T,
  onFailure: (error: Error) => T,
  onSuccess: (data: R) => T,
): T {
  const { isLoading, isError, error, data } = query;
  if (isLoading) return onLoading();
  if (isError) return onFailure(error);

  return onSuccess(data as R);
}
