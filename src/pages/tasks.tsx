import type { NextPage } from "next";
import { Task } from "../components/task";
import { Category } from "../components/category";

import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { Task as PTask } from "@prisma/client";
import Link from "next/link";
import { motion } from "framer-motion"
import useUserId from "../components/hooks/useUserId";

const Tasks: NextPage = () => {
  const [addCategory, setAddCategory] = useState<string>('')
  const [items, setItems] = useState<PTask[]>([]);
  const userId = useUserId();
  const [editInfo, setEditInfo] = useState({ title: '', desc: '' })
  const [isEditing, setIsEditing] = useState(false);

  const utils = trpc.useContext();
  const handleSuccess = async () => {
    await utils.invalidateQueries(["task.getAll"]);
  }

  const tasks = trpc.useQuery(["task.getAll", { userId: userId }]);
  const categories = trpc.useQuery(["category.getAllActive", { userId: userId }]);

  const deleteTask = trpc.useMutation(['task.deleteTask'], {
    async onSuccess() { handleSuccess() }
  });
  const editTask = trpc.useMutation(['task.editTask'], {
    async onSuccess() { handleSuccess() }
  });
  const editTaskCategory = trpc.useMutation(['task.editTaskCategory'], {
    async onSuccess() { handleSuccess() }
  });
  const createTask = trpc.useMutation(['task.createTask'], {
    async onSuccess() { handleSuccess() }
  });
  const reorderTaskById = trpc.useMutation(['task.reorderTaskById']);

  useEffect(() => {
    if (tasks.data) {
      setItems(tasks.data);
    }
  }, [tasks.data])

  const handleAdd = async (categoryId: string) => {
    console.log(isEditing)
    if (isEditing === true) {
      // await createTask.mutateAsync({
      //   title: title,
      //   description: description,
      //   categoryId: addCategory,
      //   userId: userId
      // });

      // setAddCategory('');
      doCreateTask(categoryId);
    } else {
      setAddCategory(categoryId);
    }

  }

  useEffect(() => {
    if (addCategory !== '') {
      setIsEditing(() => true);

      const newItem: PTask = {
        id: '',
        order: -1,
        title: '',
        description: '',
        new: true,
        categoryId: addCategory,
        userId: userId,
      }

      const itemsWithNew = [...items, newItem]

      setItems(itemsWithNew);
    }
  }, [addCategory])

  useEffect(() => {
    if (categories.data) {
      categories.data!.map(category => {
        items
          .filter(item => item.categoryId === category.id)
          .map((item, i) => {
            reorderTaskById.mutate({
              id: item.id,
              order: i,
            })
          })
      })
    }
  }, [items])

  const handleCategoryChange = async (id: string, newCategoryId: string) => {
    await editTaskCategory.mutateAsync({
      id: id,
      categoryId: newCategoryId,
    })
  }

  const handleEdit = async (id: string, title: string, description: string, isNew: boolean) => {
    if (isNew === true) {
      // await createTask.mutateAsync({
      //   title: title,
      //   description: description,
      //   categoryId: addCategory,
      //   userId: userId
      // });

      // setAddCategory('');
      doCreateTask();
    } else {
      await editTask.mutateAsync({
        id: id,
        data: {
          title: title,
          description: description,
          new: false,
        }
      });
    }
  }

  const doCreateTask = async (categoryId?: string) => {
    await createTask.mutateAsync({
      title: editInfo.title,
      description: editInfo.desc,
      categoryId: addCategory,
      userId: userId
    });

    setIsEditing(() => false);
    if (categoryId) {
      setAddCategory(categoryId);
    } else {
      setAddCategory('');
    }
  }

  const handleDelete = async (id: string) => {
    if (addCategory !== '') {
      const updatedItems = items.filter(item => item.id !== '');
      setItems(updatedItems);
      setAddCategory('');
    } else {
      await deleteTask.mutateAsync({ id: id });
    }
  }

  const handleTitleChange = (value: string) => { setEditInfo({ ...editInfo, title: value }) }
  const handleDescChange = (value: string) => { setEditInfo({ ...editInfo, desc: value }) }

  return (
    <motion.div className="flex gap-1 w-full flex-row justify-start min-h-screen">
      {(categories.data && categories.data.length !== 0) ? categories.data!
        .map((category, i) =>
          <Category
            key={category.id}
            name={category.name}
            index={i}
            onAdd={() => handleAdd(category.id)}
          >
            {items && items.filter(task => task.categoryId === category.id)
              .map((task, i) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title!}
                  description={task.description!}
                  index={i}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(task.id)}
                  isNew={task.new}
                  categoryId={task.categoryId}
                  onCategoryChange={handleCategoryChange}
                  onTitleChange={handleTitleChange}
                  onDescChange={handleDescChange}
                />
              )
              )}
          </Category>
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


