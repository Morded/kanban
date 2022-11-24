import { createRouter } from "./context";
import { z } from "zod";

export const tagRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.tag.findMany();
    },
  })
