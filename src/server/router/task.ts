import { createRouter } from "./context";
import { z } from "zod";

export const taskRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.task.findMany();
    },
  })
  .query("getMaxOrderByCategory", {
    input: z
      .object({
        categoryId: z.string().cuid(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.aggregate({
        _max: { order: true },
        where: { categoryId: input.categoryId }
      })
        .catch((error) => {
          return error
        });
    },
  })
  .mutation('createTask', {
    input: z
      .object({
        order: z.number(),
        title: z.string(),
        description: z.string(),
        categoryId: z.string().cuid(),
        new: z.boolean(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.create({
        data: input,
      });
    }
  })
  .mutation('editTask', {
    input: z
      .object({
        id: z.string().cuid(),
        data: z.object({
          title: z.string(),
          description: z.string(),
          new: z.boolean(),
        })
      }),
    async resolve({ ctx, input }) {
      const { id, data } = input;
      return await ctx.prisma.task.update({
        where: { id },
        data,
      });
    }
  })
  .mutation('deleteTask', {
    input: z
      .object({
        id: z.string().cuid(),
      }),
    async resolve({ input: id, ctx }) {
      return await ctx.prisma.task.delete({
        where: id,
      })
    }
  });
