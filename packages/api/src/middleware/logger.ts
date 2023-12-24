/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export async function loggerHandler({ type, path, ctx, next }: any) {
  const start = Date.now();

  const startMeta = { path, type };
  console.log(
    `\n✨ tRPC request from ${ctx.headers.get("x-trpc-source")} start:`,
    startMeta,
  );
  const result = await next();

  const durationMs = Date.now() - start;
  const endMeta = { ...startMeta, durationMs };

  result.ok
    ? console.log("🎯 OK request end timing:", endMeta)
    : console.error("🐛 Non-OK request end timing", endMeta);

  return result;
}
