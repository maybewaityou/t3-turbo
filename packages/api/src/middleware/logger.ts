/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export async function loggerHandler(opts: any) {
  const start = Date.now();

  const result = await opts.next();

  const durationMs = Date.now() - start;
  const meta = { path: opts.path, type: opts.type, durationMs };

  result.ok
    ? console.log("<<< OK request timing:", meta)
    : console.error("<<< Non-OK request timing", meta);

  return result;
}
