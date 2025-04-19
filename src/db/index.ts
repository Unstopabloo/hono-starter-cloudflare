import { drizzle } from 'drizzle-orm/d1';

import type { Environment } from "@/env";

import * as schema from "./schema";

export function createDb() {
  const db = drizzle({
    schema
  });

  return { db };
}