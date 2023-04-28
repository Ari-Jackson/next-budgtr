import { Prisma } from "@prisma/client";
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
  getTotal: privateProcedure.query(async ({ ctx }) => {
    const deposits = await ctx.prisma.loggedTransaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        authorid: ctx.userId,
        deposit: true,
      },
    });
    const withdrawl = await ctx.prisma.loggedTransaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        authorid: ctx.userId,
        deposit: false,
      },
    });
    return { deposits, withdrawl };
  }),
  createLog: privateProcedure
    .input(newLogShape)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.loggedTransaction.create({
        data: {
          ...input,
          amount: new Prisma.Decimal(input.amount),
          authorid: ctx.userId,
        },
      });
    }),
  updateLog: privateProcedure
    .input(z.object({ content: newLogShape, transactionId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.loggedTransaction.update({
        where: {
          transactionId: input.transactionId,
        },
        data: {
          ...input.content,
          transactionId: input.transactionId,
          amount: new Prisma.Decimal(input.content.amount),
          authorid: ctx.userId,
        },
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
