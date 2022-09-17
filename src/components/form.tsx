import Link from 'next/link';
import React from 'react'

type InputProps = {
  label: string,
  type: string,
}

const Input = ({ label, type }: InputProps) => {
  return (
    <>
      <label className="text-sl text-white pb-2">{label}</label>
      <input className="p-2" type={`${type}`}></input>
      <div className="p-2"></div>
    </>
  );
};

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
            <Link className="text-yellow-200" href={`${otherLink}`}>
              <a> {otherLinkText}</a>
            </Link>
          </p>
        </div>
      )
    }
  }

  return (
    <>
      <button onClick={handleClick} className="uppercase text-gray-800 hover:shadow-md text-2xl border bg-yellow-200 rounded-xl shadow-md py-3 px-6 hover:bg-gray-700 hover:text-yellow-200 border-yellow-200 transition-all duration-200 drop-shadow-2xl">
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
    <>
      <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-white">
        {header}
      </h1>
      <div className="p-6"></div>

      <form className="flex flex-col" method="post">
        {children}
      </form>
    </>
  );
};

export { Input, Button, Form }
