/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { left, right, type Either } from 'fp-ts/Either'
import type { RedisKey } from 'ioredis'
import { Redis } from 'ioredis'

import { match, toE } from '@acme/extensions'

export class KVStore extends Redis {
  public async getE<T>(key: RedisKey): Promise<Either<Error, T | null>> {
    const result = await toE(super.get(key))
    return match(
      result,
      (error) => left(error),
      (value: string | null) => {
        if (!value) return right(null)

        return right(value as T)
      },
    )
  }

  public async getObj<T>(key: RedisKey): Promise<Either<Error, T | null>> {
    const result = await toE(super.get(key))
    return match(
      result,
      (error) => left(error),
      (value: string | null) => {
        if (!value) return right(null)

        return right(JSON.parse(value) as T)
      },
    )
  }

  public async set(key: RedisKey, value: string) {
    return super.set(key, value)
  }

  public async setObj<T>(key: RedisKey, value: T) {
    return super.set(key, JSON.stringify(value))
  }

  public async setWithExpire(key: RedisKey, value: string, seconds: number | string = 60) {
    return super.set(key, value, 'EX', seconds)
  }

  public async setObjWithExpire<T>(key: RedisKey, value: T, seconds: number | string = 60) {
    return super.set(key, JSON.stringify(value), 'EX', seconds)
  }
}
