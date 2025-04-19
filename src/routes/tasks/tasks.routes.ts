import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes"

export const list = createRoute({
  tags: ["tasks"],
  path: "/tasks",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({
        id: z.number(),
        title: z.string(),
        completed: z.boolean()
      })),
      "Returns a list of tasks"
    )
  }
})

export type ListRoute = typeof list