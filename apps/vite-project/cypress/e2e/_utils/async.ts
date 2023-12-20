/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export function delay(timeout = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
