import Link from 'next/link';
import React, { useState } from 'react'

type InputProps = {
  label: string,
  type: string,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, type }, ref) => {
  const [value, setValue] = useState('')

  return (
    <>
      <label className="text-sl text-gray-400 pb-2">{label}</label>
      <input
        ref={ref}
        className="py-2 px-4 focus:outline-none glassmorph-dark text-white border border-slate-800 rounded transition-transform ease-in-out focus:border-purple-700 sm:focus:scale-110"
        type={`${type}`}
        value={value}
        onChange={e => setValue(e.target.value)}
      ></input>
      <div className="p-2"></div>
    </>
  );
});

Input.displayName = 'Input';

type ButtonProps = {
  handleClick: React.MouseEventHandler,
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
            <Link href={`${otherLink}`}>
              <a className="font-bold text-fuchsia-800 hover:text-fuchsia-700"> {otherLinkText}</a>
            </Link>
          </p>
        </div>
      )
    }
  }

  return (
    <>
      <button onClick={handleClick} className="hover:shadow-md text-2xl text-white rounded-xl shadow-md py-3 px-6 transition-all duration-200 drop-shadow-2xl font-bold rounded-3xl bg-gradient-to-r from-violet-800 to-fuchsia-800
                duration-300 transition-all ease-in-out hover:from-violet-700 hover:to-fuchsia-700 hover:scale-105">
        {text}
      </button>
      {other()}
    </>
  );
};

type FormProps = {
  children: React.ReactNode,
  header: string
};

const Form: React.FC<FormProps> = ({ children, header }) => {
  return (
    <div className='px-2'>
      <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-white">
        {header}
      </h1>
      <div className="p-6"></div>

      <form className="flex flex-col" method="post">
        {children}
      </form>
    </div>
  );
};

export { Input, Button, Form }
