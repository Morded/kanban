import type { NextPage } from "next";

import { trpc } from "../utils/trpc";
import AddNewButton from "../components/addNew";
import { useRef, useState } from "react";
import Modal from "../components/modal";
import CategoryCard from "../components/categoryCard"

const Categories: NextPage = () => {
  const utils = trpc.useContext();
  const handleSuccess = async () => await utils.invalidateQueries(["category.getAll"]);
  const categories = trpc.useQuery(["category.getAll"]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [actualAddInput, setActualAddInput] = useState('')

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

  const handleAdd = async () => {
    await createCategory
      .mutateAsync({
        name: '',
        // TODO: Need to implement the order to have the max value
        order: 0,
      });
  }

  const handleEdit = async (id: string, name: string, active: boolean) => {
    await editCategory
      .mutateAsync({
        id: id,
        data: {
          name: name, active: active, new: false
        }
      });
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
    <div className="container pt-40 w-96 h-96 text-gray-200 flex flex-col gap-1 w-full items-start min-h-screen">
      <h2 className="text-xl font-extrabold ml-1 self-start">Categories</h2>
      <AddNewButton
        text="category"
        onAdd={() => handleAdd()}
      />
      <div className="flex flex-col gap-4 w-full text-white">
        {categories.data && categories.data!.map(category =>
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            isDefault={category.default}
            isActive={category.active}
            onEdit={handleEdit}
            onDelete={() => handleDelete(category.id)}
            isNew={category.new}
          />
        )}
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
      <Modal
        open={addModalOpen}
        onOkay={() => { }}
        onClose={() => setAddModalOpen(false)}
        okayButtonText="Add"
      >
        <h2 className="text-center text-xl font-bold">Add new category</h2>
        <input
          type='text'
          value={actualAddInput}
          onChange={e => setActualAddInput(e.target.value)}
          className="bg-transparent focus:outline-none p-2 rounded text-center border border-gray-700 focus:border-violet-700"
        />

      </Modal>
    </div>
  );
};

export default Categories;
