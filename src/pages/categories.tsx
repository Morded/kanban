import type { NextPage } from "next";

import { trpc } from "../utils/trpc";
import AddNewButton from "../components/addNew";
import { useEffect, useState } from "react";
import Modal from "../components/modal";
import CategoryCard from "../components/categoryCard"
import { Reorder } from "framer-motion"
import { Category } from "@prisma/client";
import _app from "./_app";

const Categories: NextPage = () => {
  const utils = trpc.useContext();
  const handleSuccess = async () => await utils.invalidateQueries(["category.getAll"]);
  const [items, setItems] = useState<Category[]>([]);
  const categories = trpc.useQuery(["category.getAll"]);
  const [uniqueConflictName, setUniqueConflictName] = useState('')
  const [isReordering, setIsReordering] = useState(false)
  const [isNewItem, setIsNewItem] = useState(false)

  useEffect(() => {
    if (categories.data) {
      setItems(categories.data);
    }
  }, [categories.data])

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const deleteCategory
    = trpc.useMutation(['category.deleteCategory'
    ], {
      async onSuccess() { handleSuccess() }
    });
  const editCategory
    = trpc.useMutation(['category.editCategory'], {
      async onSuccess() { handleSuccess() }
    });
  const createCategory
    = trpc.useMutation(['category.createCategory'
    ], {
      async onSuccess() { handleSuccess() }
    });
  const reorderCategoryById = trpc.useMutation(['category.reorderCategoryById']);

  useEffect(() => {
    if (isReordering === false && isNewItem === false && uniqueConflictName === '') {
      setIsReordering(true);
    }

    setIsNewItem(false);
  }, [items])

  useEffect(() => {
    if (isReordering === true) {
      items.map((item, i) => {
        console.log('item: ', item.id, 'index:', i)
        reorderCategoryById.mutate({
          id: item.id,
          order: i,
        })
      })
      setIsReordering(false);
    }
  }, [isReordering])

  const handleAdd = async () => {
    setIsNewItem(true);
  }

  useEffect(() => {
    if (isNewItem === true) {
      const newItem: Category = {
        id: '',
        order: -1,
        name: '',
        default: false,
        active: true,
        new: true
      }

      const itemsWithNew = [...items, newItem]

      setItems(itemsWithNew);
    }
  }, [isNewItem])

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
            new: item.new
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

  const handleEdit = async (id: string, name: string, active: boolean, isNew: boolean) => {
    // if (isNew === true) {
    let alreadyExists = false;
    items.map(category => {
      if (category.name.toLowerCase() === name.toLowerCase()) {
        alreadyExists = true;
      }
    })

    if (alreadyExists) {
      setUniqueConflictName(name);
    } else {
      if (isNew === true) {
        await createCategory.mutateAsync({ name: name })
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
  }

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  }

  const handleDeleteOkay = async () => {
    await deleteCategory
      .mutateAsync({ id: deleteId })
      .then(() => {
        setDeleteId('');
        setDeleteModalOpen(false);
      });
  }

  return (
    <div className="container pt-40 w-96 h-96 text-gray-200 flex flex-col gap-1 w-full items-start min-h-screen px-4">
      <h2 className="text-xl font-extrabold ml-1 self-start">Categories</h2>
      <AddNewButton
        text="category"
        onAdd={() => handleAdd()}
      />
      <div className="flex flex-col gap-4 w-full text-white">
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-4 w-full text-white">
          {items && items.map(category =>
            <Reorder.Item key={category.id} value={category}>
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
        {uniqueConflictName !== '' &&
          <div className={`mt-4 flex items-center justify-center`}>
            <p className="py-1 px-4 border rounded-3xl bg-red-200 text-red-900 font-bold text-center">
              A category with that name already exists.
              <br />
              Rename it to create a new category.
            </p>
          </div>
        }
      </div>
      <Modal
        open={deleteModalOpen}
        onOkay={() => handleDeleteOkay()}
        onClose={() => setDeleteModalOpen(false)}
        okayButtonText="Delete"
      >
        <h2 className="text-center text-xl font-bold">Warning</h2>
        <p>If you delete this column, all the tasks under this category will be deleted as well.</p>

      </Modal>
    </div >
  );
};

export default Categories;
