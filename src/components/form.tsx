import Link from 'next/link';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';

type InputProps = {
  label: string,
  type: string,
  onChange: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, type, onChange }, ref) => {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: any) => {
    e.preventDefault();
    setShowPassword(prev => !prev)
  }

  return (
    <div className="flex flex-col relative">
      <label className="text-sl text-gray-400 pb-2">{label}</label>
      <input
        ref={ref}
        className="py-2 px-4 focus:outline-none peer glassmorph-dark text-white border border-slate-800 rounded transition-transform ease-in-out focus:border-purple-700 sm:focus:scale-110"
        type={`${showPassword ? 'text' : type}`}
        name={label}
        // value={value}
        // onChange={({ target }) => setValue(target.value)}
        onChange={({ target }) => onChange(target.value)}
      ></input>
      {
        type === 'password' &&
        <a
          className='cursor-pointer text-gray-400 p-3 border border-transparent hover:text-white absolute -right-9 top-[2rem] transition-all ease-in-out peer-focus:-right-8 peer-focus:text-xl'
          onClick={e => handleShowPassword(e)}
        >
          {showPassword === true ? <FiEyeOff /> : <FiEye />}
        </a>
      }
      <div className="p-2"></div>
    </div >
  );
});

Input.displayName = 'Input';

type ButtonProps = {
  handleClick?: React.MouseEventHandler,
  text: string,
  otherText?: string,
  otherLink?: string,
  otherLinkText?: string
};

const Button: React.FC<ButtonProps> = ({ handleClick, text, otherText, otherLink, otherLinkText }) => {
  const other = () => {
    if (otherText && otherLink && otherLinkText) {
      return (
        <div className="text-center text-gray-200 pt-2">
          <p>{otherText}
            <Link href={`/${otherLink}`}>
              <a className="font-bold text-fuchsia-800 hover:text-fuchsia-700"> {otherLinkText}</a>
            </Link>
          </p>
        </div>
      )
    }
  }

  return (
    <>
      <button onClick={handleClick}
        className="hover:shadow-md text-2xl text-white rounded-xl shadow-md py-3 px-6 transition-all duration-200 drop-shadow-2xl font-bold rounded-3xl bg-gradient-to-r from-violet-800 to-fuchsia-800
                duration-300 transition-all ease-in-out hover:from-violet-700 hover:to-fuchsia-700 hover:scale-105">

        {text}
      </button>
      {other()}
    </>
  );
};

type FormProps = {
  children: React.ReactNode,
  header: string,
  onSubmit?: FormEventHandler<HTMLFormElement>,
};

const Form: React.FC<FormProps> = ({ children, header, onSubmit }) => {
  return (
    <div className='px-2'>
      <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-white">
        {header}
      </h1>
      <div className="p-6"></div>

      <form className="flex flex-col" method="post" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export { Input, Button, Form }
