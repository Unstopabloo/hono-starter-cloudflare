import type { Context, MiddlewareHandler } from "hono";
import type { Env } from "hono-pino";

import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export function logger() {
  return ((c, next) => pinoLogger({
    pino: pino(pretty()),
    http: { referRequestIdKey: "requestId" },
  })(c as unknown as Context<Env>, next)) satisfies MiddlewareHandler<Env>;
}