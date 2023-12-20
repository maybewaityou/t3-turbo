/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export function responseWrap(data: any) {
  return {
    success: true,
    code: 200,
    msg: 'success',
    data
  }
}
