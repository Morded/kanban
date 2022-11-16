import type { NextPage } from "next";
import { Task } from "../components/task";
import { Category } from "../components/category";

import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";

const Dashboard: NextPage = () => {
  const [addCategory, setAddCategory] = useState('')

  const utils = trpc.useContext();
  const handleSuccess = async () => {
    await utils.invalidateQueries(["task.getAll"]);
  }

  const tasks = trpc.useQuery(["task.getAll"]);
  const categories = trpc.useQuery(["category.getAll"]);
  const getMaxOrder = trpc.useQuery(["task.getMaxOrderByCategory", { categoryId: addCategory }])

  const deleteTask = trpc.useMutation(['task.deleteTask'], {
    async onSuccess() { handleSuccess() }
  });
  const editTask = trpc.useMutation(['task.editTask'], {
    async onSuccess() { handleSuccess() }
  });
  const createTask = trpc.useMutation(['task.createTask'], {
    async onSuccess() { handleSuccess() }
  });

  const handleAdd = async (categoryId: string) => {
    // setAddCategory(() => categoryId);
    // const order =
    //   console.log(order);
    createTask.mutateAsync({
      order: 0,
      title: '',
      description: '',
      categoryId: categoryId,
      new: true
    });
  }

  useEffect(() => {
    if (addCategory === '' || typeof getMaxOrder.data === 'undefined') return

    let order = getMaxOrder!.data!._max.order
    console.log(order)

    // if (order === null) order = 0
    // createTask.mutateAsync({
    //   order: order,
    //   title: '',
    //   description: '',
    //   categoryId: addCategory,
    //   new: true
    // });
  }, [addCategory])

  const handleEdit = async (id: string, title: string, description: string) => {
    await editTask.mutateAsync({
      id: id,
      data: {
        title: title,
        description: description,
        new: false,
      }
    });
  }

  const handleDelete = async (id: string) => {
    await deleteTask.mutateAsync({ id: id });
  }

  return (
    <div className="flex gap-1 w-full flex-row justify-start min-h-screen overflow">
      {categories.data && categories.data!
        .filter(category => category.active === true)
        .map(category =>
          <Category
            name={category.name}
            onAdd={() => handleAdd(category.id)}
          >
            {tasks.data && tasks.data!.filter(task => task.categoryId === category.id).map(task => (
              < Task
                key={task.id}
                order={task.order}
                id={task.id}
                title={task.title!}
                description={task.description!}
                onEdit={handleEdit}
                onDelete={() => handleDelete(task.id)}
                isNew={task.new}
              />
            )
            )}
          </Category>
        )}
    </div>
  );
};

export default Dashboard;

