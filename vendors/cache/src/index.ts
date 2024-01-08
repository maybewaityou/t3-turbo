/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { KVStore } from "./kv";

export const kv = new KVStore(process.env.REDIS_URL || "", {
  keyPrefix: process.env.REDIS_KEY_PREFIX,
  showFriendlyErrorStack: true,
});
