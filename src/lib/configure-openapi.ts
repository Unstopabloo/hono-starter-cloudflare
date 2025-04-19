import { OpenAPIHono } from "@hono/zod-openapi";
import packageJSON from "../../package.json" assert { type: "json" };
import { Scalar } from '@scalar/hono-api-reference'

export function configureOpenapi(app: OpenAPIHono) {
  app.doc("/docs", {
    info: {
      title: packageJSON.name,
      version: packageJSON.version,
      description: packageJSON.description,
      contact: {
        name: packageJSON.author
      },
      license: {
        name: packageJSON.license
      }
    },
    openapi: "3.1.0"
  })

  app.get(
    '/reference',
    Scalar({
      url: "/docs",
      favicon: "🔥",
      theme: "kepler",
    }),
  )
}

