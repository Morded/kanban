import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { motion } from "framer-motion"
import { getSession } from "next-auth/react";
import useUserId from "../components/hooks/useUserId";

const Dashboard: NextPage = () => {
  const [quote, setQuote] = useState<{ author: string, content: string }>()
  const { userId } = useUserId();
  const categories = trpc.useQuery(["category.getAllActive", { userId: userId }]);
  const taskCount = trpc.useQuery(["task.getCountByCategory", { userId: userId }]);
  const [noCategories, setNoCategories] = useState(true);
  const utils = trpc.useContext();
  const createDefaults = trpc.useMutation(["category.createDefaults"], {
    async onSuccess() {
      await utils.invalidateQueries(["category.getAllActive"]);
    }
  });

  const fetchRandomQuote = async () => {
    await axios.get('https://api.quotable.io/random', { params: { tags: 'technology' } }).then((data) => {
      const { author, content } = data.data;
      setQuote({ author: author, content: content });
    })
  }

  useEffect(() => {
    if (categories.data) {
      if (categories!.data!.length !== 0) {
        setNoCategories(false);
      }
    }
  }, [categories])

  useEffect(() => {
    createDefaults.mutateAsync({ userId: userId }).then(() => fetchRandomQuote());
  }, [userId])

  return (
    <div className="flex flex-col p-4 gap-20 h-full pt-24 items-center justify-start md:justify-center md:pt-0 items-start w-full text-white">
      {(quote && userId !== '') &&
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg sm:text-2xl text-slate-600 flex flex-col w-3/4 gap-4 items-center justify-center text-center">
            <p className="italic">&quot;{quote.content}&quot;</p>
            <p className="text-sm">{quote.author}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5
            }}
            className="flex flex-col gap-4 w-full">
            <div className="flex flex-col mx-auto justify-center items-center text-center text-xl gap-10 w-full md:w-3/4">
              {!noCategories &&
                <h2 className="font-extrabold text-xl text-gray-200">Task summary</h2>}

              <div className="flex flex-col justify-center gap-10 items-center w-full">
                {noCategories ?
                  <div>No active categories found.</div>
                  :
                  <div className="flex flex-col justify-center flex-wrap items-center text-center text-xl md:flex-row gap-4 w-full">
                    {categories?.data &&
                      categories.data
                        .filter(category => category.active === true)
                        .map(category =>
                          <div
                            key={category.id}
                            className={`py-6 min-w-[20rem] border-slate-700 rounded-xl
                text-white flex flex-col glassmorph-dark
              `}
                          >
                            <p className="text-violet-500">{category.name}</p>

                            <span className="text-2xl font-bold">
                              {
                                taskCount.data && (taskCount.data
                                  .filter(task => task.categoryId === category.id)
                                  .length > 0
                                  ? taskCount.data
                                    .filter(task => task.categoryId === category.id)
                                    .map(task => task._count._all
                                    )
                                  : 0
                                )}
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
        </>
      }
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: { session }
  }
}
