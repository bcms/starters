import React, { FC, ChangeEvent } from 'react';
import classNames from 'classnames';

interface InputProps {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'textarea';
  error?: string;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({
  name,
  value,
  label = '',
  placeholder = '',
  type = 'text',
  error = '',
  onChange,
}) => {
  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  const inputClasses = classNames(
    'border bg-transparent rounded-[40px] px-4 py-[14px] text-xs leading-none font-medium tracking-[-0.41px] transition-colors duration-300 placeholder:text-[#56565F] focus:outline-none lg:px-5 lg:py-[17px] lg:text-sm lg:leading-none',
    {
      'border-red-500': error,
      'border-[#C2C0BC]': !error,
    },
  );

  const textareaClasses = classNames(
    'border bg-transparent rounded-[10px] px-4 py-[14px] text-xs leading-none font-medium tracking-[-0.41px] placeholder:text-[#56565F] resize-none h-[96px] transition-colors duration-300 focus:outline-none lg:px-5 lg:py-[17px] lg:text-sm lg:leading-none lg:h-[152px]',
    {
      'border-red-500': error,
      'border-[#C2C0BC]': !error,
    },
  );

  return (
    <label className="flex flex-col">
      {label && (
        <div className="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-4 lg:text-base lg:leading-none">
          {label}
        </div>
      )}
      {type !== 'textarea' ? (
        <input
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          style={{
            boxShadow: '0px 0px 4px rgba(196, 202, 217, 0.3)',
          }}
          onChange={handleInput}
        />
      ) : (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          className={textareaClasses}
          style={{
            boxShadow: '0px 0px 4px rgba(196, 202, 217, 0.3)',
          }}
          onChange={handleInput}
        />
      )}
    </label>
  );
};

export default Input;
