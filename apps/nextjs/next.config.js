// Importing env files here to validate on build
import "@acme/api/env";
import "@acme/auth/env";
import "@acme/mqtt/env";
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/cache",
    "@acme/db",
    "@acme/elysia",
    "@acme/extensions",
    "@acme/jwt",
    "@acme/mqtt",
    "@acme/tanstack",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: "standalone",
};

export default config;
