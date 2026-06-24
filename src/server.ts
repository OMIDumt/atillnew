import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

import { createStartHandler } from "@tanstack/start-server-core";
import { defaultRenderHandler } from "@tanstack/react-start-server";

const handler = createStartHandler(defaultRenderHandler);

// The Vite dev-server plugin expects the server entry default export to be
// an object with a `fetch` method: `export default { fetch(req) { ... } }`.
// Provide that shape so both dev and production runtimes work the same.
export default {
  fetch(request: Request, env?: unknown, ctx?: unknown) {
    // Forward to the Start handler. The handler accepts an optional
    // `requestOpts` object; pass `ctx` as `context` so middleware can access it.
    return handler(request, { context: ctx });
  },
};