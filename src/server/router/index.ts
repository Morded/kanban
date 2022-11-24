// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { taskRouter } from "./task";
import { categoryRouter } from "./category";
import { protectedExampleRouter } from "./protected-example-router";
import { userRouter } from "./user";
import { tagRouter } from "./tag";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("task.", taskRouter)
  .merge("category.", categoryRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("user.", userRouter)
  .merge("tag.", tagRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
