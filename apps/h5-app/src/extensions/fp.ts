/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Either, getOrElse as getOrElseF, match as matchF } from 'fp-ts/Either'

export function get<L, R>(result: Either<L, R>): R {
  const target = getOrElse(result, null)
  if (target === null) throw Error('no value error')
  return target
}

export function getLeft<L, R>(result: Either<L, R>): L {
  return pipe(
    result as Either<L, never>,
    getOrElseF((error) => error),
  )
}

export function getOrElse<L, R>(result: Either<L, R>, defaultValue: R): R {
  return pipe(
    result,
    getOrElseF(() => defaultValue),
  )
}

export function match<L, R, T>(result: Either<L, R>, onLeft: (e: L) => T, onRight: (a: R) => T): T {
  return pipe(result, matchF(onLeft, onRight))
}

export function fold<L, R, T>(result: Either<L, R>, onLeft: (e: L) => T, onRight: (a: R) => T): T {
  return match(result, onLeft, onRight)
}
