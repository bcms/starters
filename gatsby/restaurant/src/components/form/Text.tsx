import React, { ChangeEvent } from 'react';
import classnames from 'classnames';
interface FormTextProps {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'date' | 'time' | 'textarea';

  className?: string;

  error?: boolean;
}

export const FormText: React.FC<FormTextProps> = ({
  value,
  label,
  placeholder,
  onChange,
  type = 'text',
  error = false,
  className,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e.target.value);
  };
  return (
    <label className={classnames('relative flex flex-col', className)}>
      {label && (
        <div className="absolute -top-2 left-[14px] px-[14px] bg-appBody text-xs leading-none tracking-[-0.41px] text-appGray-400 lg:left-7 lg:text-sm lg:leading-none">
          {label}
        </div>
      )}
      {type === 'textarea' ? (
        <textarea
          value={value}
          placeholder={placeholder}
          className={classnames(
            'border bg-transparent rounded-[32px] px-[14px] py-[17px] text-sm leading-none tracking-[-0.41px]\n' +
              '            placeholder:text-[#665E5E] resize-none h-[140px] transition-colors duration-300 focus:outline-none lg:px-7\n' +
              '            lg:py-6 lg:text-base lg:leading-none lg:h-[224px]',
            { 'border-red-500': error, 'border-[#A8A7A0]': !error },
          )}
          onChange={handleChange}
        />
      ) : (
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          className={classnames(
            'border bg-transparent rounded-[48px] px-[14px] py-[17px] text-sm leading-none tracking-[-0.41px]\n' +
              '            transition-colors duration-300 placeholder:text-[#665E5E] focus:outline-none lg:px-7 lg:py-6 lg:text-base\n' +
              '            lg:leading-none',
            { 'border-red-500': error, 'border-[#A8A7A0]': !error },
          )}
          onChange={handleChange}
        />
      )}
    </label>
  );
};
