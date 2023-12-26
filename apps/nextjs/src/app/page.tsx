/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Suspense } from "react";

import { kv } from "@acme/cache";

import type { RouterOutputs } from "~/utils/trpc/client";
import { api } from "~/utils/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import { LastPost } from "./_components/last-post";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export default async function HomePage() {
  const hello = await api.test.hello.query({ text: "World" });
  const result = await kv.getObj<RouterOutputs["post"]["create"]>("post");
  return (
    <main className="flex h-full flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        <p className="text-2xl text-white">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>
        <LastPost result={result} />
        <AuthShowcase />

        <CreatePostForm />
        <div className="h-[40vh] w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
