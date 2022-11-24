import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { trpc } from "../utils/trpc";
import AddNewButton from "./addNew";
import Modal from "./modal";

const Tags = () => {
  const tags = trpc.useQuery(['tag.getAll']);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-w-[10rem] flex flex-col gap-2 min-h-fit mx-10 mt-20 sm:mb-0">
      <h2 className="text-gray-200 text-xl font-extrabold my-2">Tags</h2>

      <AddNewButton text="tag" onAdd={() => setIsOpen(true)} />

      {tags.data && tags.data.map(tag =>
        <Tag
          key={tag.id}
          name={tag.name}
          color={tag.color}
        />
      )}

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        okayButtonText="Create"
      >
        <h2 className="text-center text-xl font-bold">Warning</h2>
        <p>If you delete this column, all the tasks under this category will be deleted as well.</p>
      </Modal >
    </div>
  )
}

export default Tags;

type TagProps = {
  name: string,
  color: string
}

const Tag = ({ name, color }: TagProps) => {
  return (
    <div className="inline text-white flex items-center gap-2">
      <span
        style={{ background: color }}
        className={`py-1 px-2 w-fit rounded-3xl text-sm`}
      >{name}</span>
      <button>
        <FiEdit3 className="text-gray-600" />
      </button>
    </div>
  )


}
