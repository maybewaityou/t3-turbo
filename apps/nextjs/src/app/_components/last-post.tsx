"use client";

import type { Either } from "@acme/extensions";
import { match } from "@acme/extensions";

export function LastPost(props: { result: Either<Error, any> }) {
  return match(
    props.result,
    () => <></>,
    (post) => <div>{JSON.stringify(post)}</div>,
  );
}
