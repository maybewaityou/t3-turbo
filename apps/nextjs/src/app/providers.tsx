/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";

import { useMqttStore } from "@acme/mqtt";

import { api, getBaseUrl } from "~/utils/trpc/client";

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headers?: Headers;
}) {
  const { mqttConnect, mqttPublish, mqttDisconnect, payload } = useMqttStore();
  useEffect(() => {
    if (payload.topic === "test-topic/ping") {
      mqttPublish({
        topic: "test-topic/pong",
        qos: 2,
        payload: {
          source: "nextjs",
          data: "pong",
        },
      });
    }
  });

  useEffect(() => {
    mqttConnect("ws://localhost:8083/mqtt", {
      username: "admin",
      password: "dongchunnan10",
      clientId: "ws_mqttx_nextjs",
      clean: true,
      rejectUnauthorized: false,
      // reconnectPeriod: 1000, // ms
      // connectTimeout: 30 * 1000, // ms
    });
    return () => {
      mqttDisconnect();
    };
  }, [""]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          fetch: (input, options) => fetch(input, options),
          headers() {
            const headers = new Map(props.headers);
            headers.set("x-trpc-source", "nextjs-react");
            headers.set(
              "authorization",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3MDQxNTA5NzQsImV4cCI6MTcwNDc1NTc3NH0.cAMTQ4yu2mGHAu_8HEJCNBvW5v_YeHWDgPn9QWArt_k",
            );
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration transformer={superjson}>
          {props.children}
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </api.Provider>
  );
}
