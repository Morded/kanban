import { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import { RiCheckLine } from "react-icons/ri";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

type CategoryCardProps = {
  id: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  onEdit: (id: string, name: string, active: boolean) => void;
  onDelete: () => void;
  isNew: boolean;
}

const CategoryCard = ({ id, name, isDefault, isActive, onEdit, onDelete, isNew }: CategoryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualValue, setActualValue] = useState(name);
  const [isActiveNow, setIsActiveNow] = useState(isActive);
  const categoryRef = useRef<HTMLInputElement>(null)
  const originalValue = name;

  useEffect(() => {
    if (isNew) {
      setIsEditing(true);
    }
  }, [])

  useEffect(() => {
    if (!isEditing) {
      doEdit();
    }

    categoryRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    doEdit();
  }, [isActiveNow])

  const doEdit = () => {
    if (originalValue !== actualValue) {
      onEdit(id, actualValue, isActiveNow);
    }
  }

  return (
    <div className={`flex flex-row gap-3 p-4 justify-between 
      items-center w-full border rounded border-slate-700 glassmorph-dark
        hover:border-lime-700 transition-all duration-100 ease-in-out
        ${isEditing ? 'border-lime-700' : ''}
        ${!isActiveNow ? 'text-gray-500' : ''}
      `}>
      <form onSubmit={e => { e.preventDefault(); setIsEditing(false) }} className='w-full'>
        <input
          ref={categoryRef}
          type="text"
          readOnly={!isEditing}
          value={actualValue}
          onChange={e => setActualValue(e.target.value)}
          className={`bg-transparent focus:outline-none w-full
        ${!isEditing ? 'cursor-default' : ''}
        `}
        />
      </form>

      {
        isDefault ?
          <Switch
            checked={isActiveNow}
            onChange={(checked) => setIsActiveNow(checked)}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={12}
            width={35}
            className=""
          />
          :
          <>
            <button
              title={isEditing ? "Done editing" : "Edit"}
              className={`text-xl transition-all duration-100 ease-in-out hover:text-violet-700 ${isEditing && "text-lime-700"}`}
              onClick={() => setIsEditing(prev => !prev)}
            >{isEditing ? <RiCheckLine /> : <FiEdit3 />}</button>
            <button
              title="Delete"
              className={`text-xl transition-all duration-100 ease-in-out hover:text-red-700`}
              onClick={onDelete}
            >
              < FiTrash2 />
            </button>
          </>
      }
    </div >
  )
}

export default CategoryCard;
