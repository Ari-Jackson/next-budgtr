import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const newLogShape = z.object({
  title: z.string(),
  from: z.string(),
  category: z.string(),
  amount: z.number().nonnegative(),
  deposit: z.boolean(),
  date: z.number(),
});

export const loggedTransactionRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.loggedTransaction.findMany({
      where: {
        authorid: ctx.userId,
      },
    });
  }),
  getLog: privateProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.loggedTransaction.findUnique({
      where: {
        transactionId: input,
      },
    });
  }),
  createLog: privateProcedure
    .input(newLogShape)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.loggedTransaction.create({
        data: { ...input, authorid: ctx.userId },
      });
    }),
  updateLog: privateProcedure
    .input(z.object({ content: newLogShape, transactionId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.loggedTransaction.update({
        where: {
          transactionId: input.transactionId,
        },
        data: input,
      });
    }),
  deleteLog: privateProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.loggedTransaction.delete({
      where: {
        transactionId: input,
      },
    });
  }),
});
