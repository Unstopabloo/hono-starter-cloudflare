import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { requestId } from "hono/request-id";
import { defaultHook } from "stoker/openapi";
import { logger } from '@/middleware/pino-logger';

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
    defaultHook
  })
}

export function createApp() {
  const app = createRouter();
  app.use(requestId());
  app.use(logger());
  app.notFound(notFound);
  app.onError(onError);

  return app
}
