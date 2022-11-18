import { createRouter } from "./context";
import { z } from "zod";

export const categoryRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.category.findMany({
        orderBy: {
          order: 'asc'
        }
      });
    },
  })
  .query("getAllActive", {
    async resolve({ ctx }) {
      return await ctx.prisma.category.findMany({
        where: {
          active: true
        },
        orderBy: {
          order: 'asc'
        }
      });
    },
  })
  .query("getMaxOrder", {
    async resolve({ ctx }) {
      return await ctx.prisma.category.aggregate({
        _max: {
          order: true,
        }
      })
    }
  })
  .mutation('createCategory', {
    input: z
      .object({
        name: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.create({
        data: {
          name: input.name,
          order: 1000000,
          new: false,
        },
      })
        .catch((error) => {
          return error.code
        });
    }
  })
  .mutation('editCategory', {
    input: z
      .object({
        id: z.string().cuid(),
        data: z.object({
          name: z.string(),
          active: z.boolean(),
          new: z.boolean(),
        })
      }),
    async resolve({ ctx, input }) {
      const { id, data } = input;
      return await ctx.prisma.category.update({
        where: { id },
        data,
      });
    }
  })
  .mutation('deleteCategory', {
    input: z
      .object({
        id: z.string().cuid(),
      }),
    async resolve({ input: id, ctx }) {
      return await ctx.prisma.category.delete({
        where: id,
      })
    }
  })
  .mutation('reorderCategoryById', {
    input: z
      .object({
        id: z.string().cuid(),
        order: z.number(),
      }),
    async resolve({ input, ctx }) {
      const { id, order } = input;
      return await ctx.prisma.category.update({
        where: { id },
        data: { order },
      })
    }
  })
