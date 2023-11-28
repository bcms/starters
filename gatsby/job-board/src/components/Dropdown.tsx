import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import { ReactComponent as JobTypeIcon } from '@/assets/icons/briefcase.svg';
import { ReactComponent as ChevronIcon } from '@/assets/icons/chevron-down.svg';
import { useClickOutside } from '@/hooks/useClickOutside';
import { CSSTransition } from 'react-transition-group';

interface SelectProps {
  value: string;
  options: string[];
  placeholder: string;
  icon: any;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  value,
  options,
  placeholder,
  icon,
  onChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownOptionRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    callback: () => setShowOptions(false),
    ref: dropdownOptionRef,
  });

  const handleOptionSelect = (option: string) => {
    if (value === option) {
      onChange('');
    } else {
      onChange(option);
    }

    setShowOptions(false);
  };

  const buttonClasses = classnames(
    'flex items-center justify-between border-b border-appGray-400 py-[19px] w-full',
  );

  return (
    <div className="relative" ref={dropdownOptionRef}>
      <button
        className={buttonClasses}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div className="flex items-center">
          {icon && <JobTypeIcon className="w-[14px] h-[14px] mr-1.5" />}
          <span
            className={classnames(
              'text-sm leading-none font-medium tracking-[-0.41px] transition-colors duration-300',
              {
                'text-appGray-500': !value,
              },
            )}
          >
            {value || placeholder}
          </span>
        </div>
        <ChevronIcon
          className={classnames(
            'w-[14px] h-[14px] transition-transform duration-300',
            {
              'rotate-180': showOptions,
            },
          )}
        />
      </button>
      <CSSTransition
        in={showOptions}
        timeout={300}
        classNames="fade" // CSS class names for the transitions
        unmountOnExit
      >
        <div className="absolute -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px border border-[#DBD9D5] bg-[#DBD9D5] rounded-md max-h-[204px] overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              className={classnames(
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
      </CSSTransition>
    </div>
  );
};

export default Select;
