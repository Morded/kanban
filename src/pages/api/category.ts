// asd
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const categories = async (req: NextApiRequest, res: NextApiResponse) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
};

export default categories;
