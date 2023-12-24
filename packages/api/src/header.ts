/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export function setAuthHeader(headers: Map<string, string>, token: string) {
  headers.set("authorization", token);
}
