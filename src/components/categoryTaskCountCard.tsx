import { motion } from "framer-motion"
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { Spinner } from "./spinner";

const CategoryTaskCountCard = ({ userId }: { userId: string }) => {
  const categories = trpc.useQuery(["category.taskCount", { userId: userId }]);
  const [noCategories, setNoCategories] = useState(true);

  useEffect(() => {
    if (categories.data) {
      if (categories!.data!.length !== 0) {
        setNoCategories(false);
      }
    }
  }, [categories])

  if (noCategories) return (<Spinner show={true} />)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.5
      }}
      className="flex flex-col gap-4 w-full">
      <div className="flex flex-col mx-auto justify-center items-center text-center text-xl gap-10 w-full md:w-3/4">
        {!noCategories &&
          <h2 className="font-extrabold text-xl text-gray-200">Task summary</h2>
        }

        <div className="flex flex-col justify-center gap-10 items-center w-full">
          {noCategories ?
            <div>No active categories found.</div>
            :
            <div className="flex flex-col justify-center flex-wrap items-center text-center text-xl md:flex-row gap-4 w-full">
              {categories?.data &&
                categories.data
                  .map(category =>
                    <div
                      key={category.id}
                      className={`py-6 min-w-[20rem] border-slate-700 rounded-xl
                        text-white flex flex-col glassmorph-dark
                      `}
                    >
                      <p className="text-violet-500">{category.name}</p>

                      <span className="text-2xl font-bold">
                        {category._count.tasks ? category._count.tasks : 0}
                      </span>
                    </div>
                  )}
            </div>
          }
          <Link href={`${noCategories ? 'categories' : 'tasks'}`}>
            <div className={`py-2 px-5 cursor-pointer font-bold rounded-3xl bg-gradient-to-r from-violet-800 to-fuchsia-800
              duration-300 transition-all ease-in-out hover:from-violet-700 hover:to-fuchsia-700
              `}>
              {noCategories ? 'Go to categories' : 'Go to tasks'}
            </div>
          </Link>
        </div>

      </div>
    </motion.div>
  )
}

export default CategoryTaskCountCard;
