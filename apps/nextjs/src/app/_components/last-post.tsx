/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
"use client";

import type { Either } from "@acme/extensions";
import { match } from "@acme/extensions";

import type { RouterOutputs } from "~/utils/trpc/client";

export function LastPost(props: {
  result: Either<Error, RouterOutputs["post"]["create"] | null>;
}) {
  return match(
    props.result,
    () => <></>,
    (post) => (
      <div>
        {post?.title} - {post?.content}
      </div>
    ),
  );
}
