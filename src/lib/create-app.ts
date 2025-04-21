import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { requestId } from "hono/request-id";
import { defaultHook } from "stoker/openapi";
import { logger } from '@/middleware/pino-logger';
import { auth } from "@/lib/auth";

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

  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  });

  app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

  return app
}
