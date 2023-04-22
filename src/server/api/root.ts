import { createTRPCRouter } from "~/server/api/trpc";
import { loggedTransactionRouter } from "~/server/api/routers/transaction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  loggedTransaction: loggedTransactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
