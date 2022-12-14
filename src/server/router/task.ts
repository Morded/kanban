import { createRouter } from "./context";
import { z } from "zod";

export const taskRouter = createRouter()
  .query("getAll", {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: {
          order: 'asc'
        }
      });
    },
  })
  .query("getCountByCategory", {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.groupBy({
        where: {
          userId: input.userId,
        },
        by: ['categoryId'],
        _count: {
          _all: true
        },
      });
    },
  })
  .query("getMaxOrderByCategory", {
    input: z
      .object({
        categoryId: z.string().cuid(),
        userId: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.aggregate({
        _max: { order: true },
        where: {
          categoryId: input.categoryId,
          userId: input.userId,
        },
      })
        .catch((error) => {
          return error
        });
    },
  })
  .mutation('createTask', {
    input: z
      .object({
        userId: z.string(),
        order: z.number(),
        title: z.string(),
        description: z.string(),
        categoryId: z.string().cuid(),
      }),
    async resolve({ ctx, input }) {
      const { userId, order, title, description, categoryId } = input

      return await ctx.prisma.task.create({
        data: {
          userId: userId,
          order: order,
          title: title,
          description: description,
          new: true,
          categoryId: categoryId,
        }
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
  })
  .mutation('reorderTaskById', {
    input: z
      .object({
        id: z.string().cuid(),
        order: z.number(),
      }),
    async resolve({ input, ctx }) {
      const { id, order } = input;
      return await ctx.prisma.task.update({
        where: { id },
        data: { order },
      })
    }
  })
  .mutation('editTaskCategory', {
    input: z
      .object({
        id: z.string().cuid(),
        categoryId: z.string().cuid(),
      }),
    async resolve({ ctx, input }) {
      const { id, categoryId } = input;
      return await ctx.prisma.task.update({
        where: { id },
        data: {
          categoryId: categoryId,
          order: 1000000,
        },
      });
    }
  })
