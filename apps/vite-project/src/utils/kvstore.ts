/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import kvjs from '@heyputer/kv.js'

class KVStore {
  private kv = new kvjs()

  public set(key: string, value: any, options?: any) {
    return this.kv.set(key, value, options)
  }

  public get(key: string) {
    return this.kv.get(key)
  }

  public has(key: string) {
    return this.kv.exists(key)
  }

  public keys(pattern: string) {
    return this.kv.keys(pattern)
  }

  public remove(key: string) {
    return this.kv.del(key)
  }

  public expire(key: string, seconds: number) {
    return this.kv.expire(key, seconds)
  }
}

const kvStore = new KVStore()

export default kvStore
