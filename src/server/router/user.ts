import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .query("get", {
    input: z
      .object({
        username: z.string(),
      }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findFirst({
        select: {
          id: true
        },
        where: {
          name: input.username
        },
      });
    },
  })
  .mutation("register", {
    input: z
      .object({
        username: z.string(),
        password: z.string().min(8, { message: "The password needs to be at least 8 characters long" }),
      }),
    async resolve({ ctx, input: { username, password } }) {
      await ctx.prisma.user.create({
        data: {
          name: username,
          password: password
        }
      })
        .catch((error) => {
          return error.message
        });

    },
  })
  // .query("getMaxOrderByCategory", {
  //   input: z
  //     .object({
  //       categoryId: z.string().cuid(),
  //     }),
  //   async resolve({ ctx, input }) {
  //     return await ctx.prisma.task.aggregate({
  //       _max: { order: true },
  //       where: { categoryId: input.categoryId }
  //     })
  //       .catch((error) => {
  //         return error
  //       });
  //   },
  // })
