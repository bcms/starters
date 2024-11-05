import React, { useState } from 'react';
import classnames from 'classnames';
import ChevronIcon from '../assets/icons/chevron-down.svg?raw';

interface Props {
    value: string;
    options: string[];
    placeholder: string;
    icon: () => JSX.Element;
    onChange: (value: string) => void;
}

const Select: React.FC<Props> = ({
    value,
    options,
    placeholder,
    icon,
    onChange,
}) => {
    const [showOptions, setShowOptions] = useState(false);

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
        <div className="relative z-10">
            <button
                className={buttonClasses}
                onClick={() => setShowOptions(!showOptions)}
            >
                <div className="flex items-center gap-1.5">
                    {icon()}
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
                <div dangerouslySetInnerHTML={{__html: ChevronIcon}}
                    className={classnames(
                        'w-[14px] h-[14px] transition-transform duration-300',
                        {
                            'rotate-180': showOptions,
                        },
                    )}
                />
            </button>
            {showOptions && (
                <div
                    className="absolute -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px border border-[#DBD9D5] bg-[#DBD9D5] rounded-md max-h-[204px] overflow-y-auto"
                    style={{
                        boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.07)',
                    }}
                >
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
            )}
        </div>
    );
};

export default Select;
