/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export class ResponseExt {
  body: any
  public constructor(body: any) {
    this.body = body
  }

  public async json() {
    return this.body.data
  }
}
