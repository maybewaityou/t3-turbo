/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { isLeft, type Either } from 'fp-ts/Either'

import { delay } from './async'

export async function retry<T>(fn: () => Promise<T>, cont = 3, time = 0): Promise<T> {
  return fn().catch((error) =>
    cont > 0 ? delay(time).then(() => retry(fn, cont - 1, time)) : Promise.reject(error),
  )
}

export async function retryE<T>(
  fn: () => Promise<Either<Error, T>>,
  cont = 3,
  time = 0,
): Promise<Either<Error, T>> {
  const either = await fn()

  if (cont > 0 && isLeft(either)) {
    await delay(time)
    return retryE(fn, cont - 1, time)
  }
  return either
}
