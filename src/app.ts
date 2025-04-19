import { createApp } from "@/lib/create-app";
import { configureOpenapi } from "./lib/configure-openapi";
import { index } from "@/routes/index.route";
import { tasks } from "@/routes/tasks/tasks.index";
import { logger } from "./middleware/pino-logger";

const app = createApp();


const routes = [
  index,
  tasks
]

routes.forEach((route) => app.route("/", route));

configureOpenapi(app);


export default app