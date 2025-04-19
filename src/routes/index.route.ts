import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes"

export const index = createRouter().openapi(createRoute({
  tags: ["index"],
  summary: "Home",
  method: "get",
  path: "/",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        message: z.string()
      }),
      "Returns a JSON object with a message property"
    )
  }
}), (c) => {
  return c.json({ message: "Hello!!" }, HttpStatusCodes.OK)
});