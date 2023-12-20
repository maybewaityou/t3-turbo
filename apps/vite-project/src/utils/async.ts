/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Either } from 'fp-ts/Either'

export function delay(timeout = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export async function to<T>(promise: Promise<T>): Promise<(null | T | undefined)[]> {
  return promise.then((data) => [null, data]).catch((err) => [err, undefined])
}

export async function toE<T>(promise: Promise<T>): Promise<Either<Error, T>> {
  return promise.then((data) => right(data)).catch((err) => left(err))
}
