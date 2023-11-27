import React, { FC, useState } from 'react';
import classNames from 'classnames';

import ChevronIcon from '@/assets/icons/chevron-down.svg';
import { StaticImage } from 'gatsby-plugin-image';

interface DropdownProps {
  value: string;
  label?: string;
  placeholder?: string;
  options: string[];
  error?: string;
  onChange: (value: string) => void;

  name?: string;
}

const Dropdown: FC<DropdownProps> = ({
  value,
  label,
  placeholder = '',
  options,
  error,
  onChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setShowOptions(false);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <div className="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-4 lg:text-base lg:leading-none">
          {label}
        </div>
      )}
      <div className="relative">
        <button
          className={classNames(
            'flex items-center justify-between w-full border bg-transparent rounded-[40px] px-4 py-[14px] transition-colors duration-300 focus:outline-none lg:px-5 lg:py-[17px]',
            {
              'border-red-500': error,
              'border-[#C2C0BC]': !error && !value,
              'text-[#56565F]': !value,
            },
          )}
          style={{
            boxShadow: '0px 0px 4px rgba(196, 202, 217, 0.3)',
          }}
          onClick={() => setShowOptions(!showOptions)}
        >
          <span className="text-xs leading-none font-medium tracking-[-0.41px] lg:text-sm lg:leading-none">
            {value || placeholder}
          </span>
          <StaticImage
            src={ChevronIcon}
            alt="Icon"
            className={classNames(
              'w-[14px] h-[14px] transition-transform duration-300',
              {
                'rotate-180': showOptions,
              },
            )}
          />
        </button>
        {showOptions && (
          <div
            className="absolute z-10 -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px border border-[#DBD9D5] bg-[#DBD9D5] rounded-lg max-h-[204px] overflow-y-auto"
            style={{
              boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.07)',
            }}
          >
            {options.map((option, index) => (
              <button
                key={index}
                className={classNames(
                  'px-5 py-[13px] w-full text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500 text-left transition-colors duration-300 hover:bg-[#DEDCD7]',
                  {
                    'bg-[#DEDCD7]': value === option,
                    'bg-white': value !== option,
                  },
                )}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
