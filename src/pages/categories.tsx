import type { NextPage } from "next";

import { trpc } from "../utils/trpc";
import AddNewButton from "../components/addNew";
import { useEffect, useMemo, useState } from "react";
import Modal from "../components/modal";
import CategoryCard from "../components/categoryCard"
import { Reorder, motion } from "framer-motion"
import { Category } from "@prisma/client";
import _app from "./_app";
import useUserId from "../components/hooks/useUserId";

const Categories: NextPage = () => {
  // const utils = trpc.useContext();
  // const handleSuccess = async () => await utils.invalidateQueries(["category.getAll"]);
  const userId = useUserId();

  const categories = trpc.useQuery(["category.getAll", { userId: userId }]);
  const [items, setItems] = useState<Category[]>([]);
  const { maxOrder, setMaxOrder } = useMaxCategoryOrder();
  const [uniqueConflictName, setUniqueConflictName] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categories.data && items !== categories.data) {
      setItems(categories.data);
    }
  }, [categories.data])


  const deleteCategory = trpc.useMutation(['category.deleteCategory']);
  const editCategory = trpc.useMutation(['category.editCategory']);
  const createCategory = trpc.useMutation(['category.createCategory']);
  const reorderCategoryById = trpc.useMutation(['category.reorderCategoryById']);

  useEffect(() => {
    if (uniqueConflictName === '') {
      reorderItems(items);
    }
  }, [items])

  const reorderItems = useMemo(() => (items: Category[]) => {
    items.map((item, i) => {
      reorderCategoryById.mutate({
        id: item.id,
        order: i,
      })
    })
  }, [items])

  const handleAdd = async () => {
    setLoading(true);
    await createCategory.mutateAsync({ userId: userId, name: '', order: maxOrder + 1 }).then(data => {
      setItems([...items, data])
      setMaxOrder(prev => prev + 1);
      setLoading(false);
    })
  }

  useEffect(() => {
    if (uniqueConflictName !== '') {
      const updatedItems = items.map(item => {
        if (item.order === -1) {
          return {
            id: item.id,
            order: -2,
            name: item.name,
            default: item.default,
            active: item.active,
            new: item.new,
            userId: userId,
          }
        } else {
          return item
        }

      })

      setItems(updatedItems);
    }

    const timeId = setTimeout(() => {
      setUniqueConflictName('')
    }, 4000)

    return () => {
      clearTimeout(timeId)
    }
  }, [uniqueConflictName])

  const doesAlreadyExist = useMemo(() => ({ items, id, name }: { items: Category[], id: string, name: string }) => {
    let exists = false
    items.filter(category => category.id !== id).map(category => {
      if (category.name.toLowerCase() === name.toLowerCase()) {
        exists = true;
      }
    })

    return exists;
  }, [items])

  const handleEdit = async (id: string, name: string, active: boolean, isNew: boolean) => {
    const alreadyExists = doesAlreadyExist({ items, id, name });

    if (alreadyExists) {
      setUniqueConflictName(name);
    } else {
      await editCategory
        .mutateAsync({
          id: id,
          data: {
            name: name, active: active, new: false
          }
        });
    }
  }

  const handleDelete = (id: string) => {
    setDeleteId(() => id);
  }

  const handleDeleteOkay = async () => {
    await deleteCategory
      .mutateAsync({ id: deleteId })
      .then((data) => {
        const updatedItems = items.filter(item => item.id !== deleteId);
        setItems(updatedItems);
        setMaxOrder(prev => prev - 1);
        setDeleteId('');
      });
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="container pt-40 w-96 h-96 text-gray-200 flex flex-col gap-1 w-full items-start min-h-screen px-4">
      <h2 className="text-xl font-extrabold ml-1 self-start">Categories</h2>
      <AddNewButton
        text="category"
        onAdd={() => handleAdd()}
      />
      <div className="flex flex-col gap-4 w-full text-white">
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col gap-4 w-full text-white"
        >
          {items && items.map((category, i) =>
            <Reorder.Item
              initial={{
                opacity: 0,
                translateY: '10px'
              }}
              animate={{
                opacity: 1,
                translateY: 0
              }}
              transition={{
                type: 'spring',
                delay: 0.1 * i
              }}
              key={category.id}
              value={category}
            >
              <CategoryCard
                key={category.id}
                order={category.order}
                id={category.id}
                name={category.name}
                isDefault={category.default}
                isActive={category.active}
                onEdit={handleEdit}
                onDelete={() => handleDelete(category.id)}
                isNew={category.new}
                isInConflict={
                  category.name.toLowerCase() === uniqueConflictName.toLowerCase() &&
                  category.name !== ''
                }
              />
            </Reorder.Item>
          )}
        </Reorder.Group>
        {loading &&

          <div className="flex justify-center items-center">
            <div className="spinner w-8 h-8 border-4 rounded-full border-x-gray-400 border-y-transparent"></div>
          </div>
        }
        {uniqueConflictName !== '' &&
          <div className={`mt-4 flex items-center justify-center`}>
            <p className="py-1 px-4 text-red-600 font-bold text-center">
              A category with that name already exists.
              <br />
              Rename it to create a new category.
            </p>
          </div>
        }
      </div>
      <Modal
        open={deleteId !== ''}
        onOkay={() => handleDeleteOkay()}
        onClose={() => setDeleteId('')}
        okayButtonText="Delete"
      >
        <h2 className="text-center text-xl font-bold">Warning</h2>
        <p>If you delete this column, all the tasks under this category will be deleted as well.</p>

      </Modal>
    </motion.div >
  );
};

export default Categories;

const useMaxCategoryOrder = () => {
  const userId = useUserId();

  const dbMaxOrder = trpc.useQuery(["category.getMaxOrder", { userId: userId }]);
  const [maxOrder, setMaxOrder] = useState(0);

  useEffect(() => {
    if (dbMaxOrder?.data?._max.order) {
      setMaxOrder(dbMaxOrder.data._max.order);
    }
  }, [dbMaxOrder])

  return { maxOrder, setMaxOrder }
}
