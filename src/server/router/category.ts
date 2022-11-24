import { createRouter } from "./context";
import { z } from "zod";

export const categoryRouter = createRouter()
  .query("getAll", {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: {
          order: 'asc'
        }
      });
    },
  })
  .query("getAllActive", {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: {
          order: 'asc'
        }
      });
    },
  })
  .query("getMaxOrder", {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.aggregate({
        _max: {
          order: true,
        },
        where: {
          userId: input.userId,
        }
      })
    }
  })
  .mutation('createCategory', {
    input: z
      .object({
        userId: z.string(),
        name: z.string(),
        isDefault: z.boolean().optional().default(false),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.create({
        data: {
          userId: input.userId,
          name: input.name,
          default: input.isDefault,
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
  .mutation('createDefaults', {
    input: z
      .object({
        userId: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.createMany({
        data: [
          {
            userId: input.userId,
            name: 'To do',
            default: true,
            order: 0,
            new: false,
          },
          {
            userId: input.userId,
            name: 'In progress',
            default: true,
            order: 1,
            new: false,
          },
          {
            userId: input.userId,
            name: 'Testing',
            default: true,
            order: 2,
            new: false,
          },
          {
            userId: input.userId,
            name: 'Done',
            default: true,
            order: 3,
            new: false,
          },
        ],
        skipDuplicates: true,
      })
        .catch((error) => {
          return error.code
        });
    }
  })
