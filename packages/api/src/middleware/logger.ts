/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import chalk from "chalk";

export async function loggerHandler({ type, path, ctx, next }: any) {
  const start = Date.now();

  const startMeta = { path, type };
  console.log(
    chalk.blue(
      `\n✨ tRPC request from ${chalk.yellow.bold(
        ctx.headers.get("x-trpc-source"),
      )} start:`,
    ),
    startMeta,
  );

  const result = await next();

  const durationMs = Date.now() - start;
  const endMeta = { ...startMeta, durationMs };

  result.ok
    ? console.log(
        chalk.blue(`🎯 ${chalk.bold("OK")} request end timing:`),
        endMeta,
      )
    : console.error(`🐛 ${chalk.bold("Non-OK")} request end timing`, endMeta);

  return result;
}
