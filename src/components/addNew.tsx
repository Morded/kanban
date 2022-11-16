import { RiAddLine } from "react-icons/ri"

type Props = {
  text?: string;
  onAdd: () => void;
}

const AddNewButton = ({ text, onAdd }: Props) => {
  return (
    <button
      onClick={() => onAdd()}
      className="flex flex-row items-center gap-1 py-1 text-gray-400 hover:text-gray-200"
    >
      <RiAddLine className="text-xl" /> Add new {text}
    </button>
  )
}

export default AddNewButton;
