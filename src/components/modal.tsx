import React, { ReactNode, useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { IoCloseSharp } from 'react-icons/io5'

type ModalProps = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  onOkay?: () => void;
  okayButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  children,
  onClose,
  onOkay,
  okayButtonText,
}: ModalProps) => {
  const [portal, setPortal] = useState<HTMLElement>()

  useEffect(() => {
    if (document.readyState === 'complete') {
      setPortal(document.getElementById('portal') || undefined);
    }
  }, [])

  if (!open) return null

  return portal
    ? ReactDom.createPortal(
      <>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-50" />
        <div className="fixed w-5/6 md:w-96 text-white border rounded border-slate-800 top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 p-6 z-50 glassmorph-darker">
          <form onSubmit={e => { e.preventDefault(); onOkay }} className="flex flex-col gap-6">
            <button onClick={onClose} className='absolute top-2 right-2 duration-100 transition-all ease-in-out hover:text-gray-500'>
              <IoCloseSharp className='text-lg' />
            </button>

            {children}

            {onOkay &&
              <div className="flex flex-row gap-3 items-center justify-center">
                <ModalButton
                  text={okayButtonText || "Ok"}
                  onClick={onOkay}
                />
                <ModalButton
                  text="Cancel"
                  onClick={onClose}
                />
              </div>
            }
          </form>

        </div>
      </>,
      portal)
    : null
}

export default Modal;

type ModalButtonProps = {
  text: string;
  onClick: () => void;
}

const ModalButton = ({ text, onClick }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='border rounded border-slate-700 py-2 px-4 capitalize duration-100 transition-all ease-in-out hover:border-violet-700'
    >
      {text}
    </button>
  )
}
