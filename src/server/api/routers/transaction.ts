import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),
  getSingle: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.transaction.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
