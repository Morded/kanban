import type { NextPage } from "next";
import { Category } from "../components/category";

import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { Task as PTask } from "@prisma/client";
import Link from "next/link";
import { motion } from "framer-motion"
import useUserId from "../components/hooks/useUserId";

type TCategory = {
  id: string
  order: number
  name: string
  default: boolean
  active: boolean
  new: boolean
  userId: string | null
  tasks: PTask[]
}

const Tasks: NextPage = () => {
  const [items, setItems] = useState<TCategory[]>();
  const userId = useUserId();

  const categoryTasks = trpc.useQuery(["category.getTasks", { userId: userId }]);
  const editTaskCategory = trpc.useMutation(['task.editTaskCategory']);

  useEffect(() => {
    if (!items && categoryTasks.data) {
      setItems(categoryTasks.data);
    }
  }, [categoryTasks.data])

  useEffect(() => {
    console.log(items)
  }, [items])

  const getCurrentTask = (id: string, categoryId: string): PTask | undefined => {
    let currTask: PTask | undefined = undefined
    items && items
      .filter(category => category.id === categoryId)
      .map(category => {
        if (category.tasks) {
          category.tasks
            .filter(task => task.id === id)
            .map(task => { currTask = task })
        }
      }
      )
    return currTask
  }

  const handleCategoryChange = async (id: string, currCategoryId: string, newCategoryId: string) => {
    if (!items) return null

    const currentTask = getCurrentTask(id, currCategoryId);
    if (!currentTask) return null

    setItems(prev =>
      prev && prev.map(category => {
        if (category.id === currCategoryId) {
          const updatedTasks = category.tasks.filter(task => task.id !== id)
          category.tasks = { ...updatedTasks }
        } else if (category.id === newCategoryId) {
          category.tasks = [...category.tasks, currentTask]
        }

        return category
      })
    )

    await editTaskCategory.mutateAsync({
      id: id,
      categoryId: newCategoryId,
    })
  }

  return (
    <motion.div className="container flex gap-2 w-full flex-row justify-start min-h-screen">
      {items ?
        items.map((category, i) =>
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            index={i}
            tasks={category.tasks}
            onCategoryChange={handleCategoryChange}
          />
        )
        : <div className="text-xl pt-20 sm:pt-0 flex flex-col gap-4 items-center justify-start sm:justify-center text-white w-full min-h-screen">
          <div>No active categories found.</div>
          <Link href='categories'>
            <div className={`py-2 px-5 cursor-pointer font-bold rounded-3xl bg-gradient-to-r from-violet-800 to-fuchsia-800
              duration-300 transition-all ease-in-out hover:from-violet-700 hover:to-fuchsia-700
              `}>
              Go to categories
            </div>
          </Link>
        </div>
      }
    </motion.div>
  );
};

export default Tasks;


