import { createRouter } from "./context";
import { z } from "zod";
import { prisma } from "../../server/db/client";

export const categoryRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.category.findMany();
    },
  })
  .mutation('createCategory', {
    input: z
      .object({
        name: z.string(),
        order: z.number(),
        default: z.boolean().default(false),
        active: z.boolean().default(true),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.create({
        data: input,
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
  });
