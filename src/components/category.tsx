import AddNewButton from "./addNew";
import { motion } from "framer-motion"
import { Task as PTask } from "@prisma/client";
import { Task } from "../components/task";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import useUserId from "./hooks/useUserId";
import { Spinner } from "./spinner";

type CategoryProps = {
  id: string;
  name: string;
  index: number;
  tasks?: PTask[];
  onCategoryChange: (id: string, currCategoryId: string, newCategoryId: string) => void;
};

export const Category = ({
  id,
  name,
  index,
  tasks,
  onCategoryChange
}: CategoryProps) => {
  const [items, setItems] = useState<PTask[]>(tasks || []);
  const [loading, setLoading] = useState(false);
  const userId = useUserId();
  const { maxOrder, setMaxOrder } = useMaxTaskOrder(id);

  const createTask = trpc.useMutation(['task.createTask']);
  const handleAdd = async () => {
    setLoading(true);
    await createTask.mutateAsync({
      userId: userId,
      order: maxOrder + 1,
      title: '',
      description: '',
      categoryId: id,
    }).then(data => {
      setItems([...items, data])
      setMaxOrder(prev => prev + 1);
      setLoading(false);
    })
  }

  const editTask = trpc.useMutation(['task.editTask']);
  const handleEdit = async (taskId: string, title: string, description: string, isNew: boolean) => {
    await editTask.mutateAsync({
      id: taskId,
      data: {
        title: title,
        description: description,
        new: false,
      }
    });
  }

  const deleteTask = trpc.useMutation(['task.deleteTask']);

  // if (items === undefined) return null

  const handleDelete = async (taskId: string) => {
    const updatedItems = items.filter(item => item.id !== taskId);

    setItems(updatedItems);
    await deleteTask.mutateAsync({ id: taskId });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.2 * index
      }}
      className="flex flex-col min-h-fit justify-center mb-20 sm:mb-0">
      <h2 className="text-gray-200 text-xl font-extrabold ml-4 my-2">{name}</h2>
      <div className="flex flex-col gap-2 rounded bg-inherit text-white w-[20rem] shadow-sm border-slate-700 h-3/4 mx-2 p-2">
        <AddNewButton
          text="task"
          onAdd={() => handleAdd()}
        />
        <div className="flex flex-col gap-4">
          {items && items.map((task, i) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title!}
              description={task.description!}
              index={i}
              onEdit={handleEdit} // handleEdit
              onDelete={() => handleDelete(task.id)} //handleDelete(task.id)
              isNew={task.new}
              categoryId={task.categoryId}
              onCategoryChange={onCategoryChange}
            />
          )
          )}

          <Spinner show={loading} />
        </div>
      </div>
    </motion.div>
  )
};

const useMaxTaskOrder = (categoryId: string) => {
  const userId = useUserId();

  const dbMaxOrder = trpc.useQuery(["task.getMaxOrderByCategory",
    { userId: userId, categoryId: categoryId }
  ]);
  const [maxOrder, setMaxOrder] = useState(0);

  useEffect(() => {
    if (dbMaxOrder?.data?._max.order) {
      setMaxOrder(dbMaxOrder.data._max.order);
    }
  }, [dbMaxOrder])

  return { maxOrder, setMaxOrder }
}
