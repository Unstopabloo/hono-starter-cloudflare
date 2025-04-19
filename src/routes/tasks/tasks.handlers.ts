import type { ListRoute } from "./tasks.routes";
import { drizzle } from 'drizzle-orm/d1';
import { usersTable } from "@/db/schema";
import { RouteHandler } from "@hono/zod-openapi";
import type { D1Database } from '@cloudflare/workers-types';

export type Bindings = {
  DB: D1Database;
}

export const list: RouteHandler<ListRoute, { Bindings: Bindings }> = async (c) => {
  const db = drizzle(c.env.DB);
  const userss = await db.select().from(usersTable);

  console.log("users", userss);
  return c.json([
    {
      id: 1,
      title: "Task 1",
      completed: false,
      status: "pending"
    },
    {
      id: 2,
      title: "Task 2",
      completed: false,
      status: "pending"
    }
  ])
}