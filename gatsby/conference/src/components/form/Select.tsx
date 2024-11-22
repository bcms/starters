import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
    value: string;
    label?: string;
    placeholder?: string;
    options: string[];
    error?: string;
    onSelect: (value: string) => void;
}

const SelectInput: React.FC<Props> = ({
    value,
    label,
    placeholder,
    options,
    error,
    onSelect,
}) => {
    const [showOptions, setShowOptions] = useState(false);

    const optionRef = useRef<HTMLDivElement | null>(null);

    useClickOutside({
        callback: () => setShowOptions(false),
        ref: optionRef,
    });

    const handleOptionClick = (option: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setShowOptions(false);
        onSelect(option);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <label className="relative flex flex-col">
            {label && (
                <div className="text-xs leading-none tracking-[-0.04em] text-appGray-500 mb-3 lg:text-xl lg:leading-none lg:mb-6">
                    {label}
                </div>
            )}
            <div className="relative">
                <button
                    type="button"
                    className={classNames(
                        'flex items-center justify-between w-full border bg-[#FAFAFA] rounded-lg px-5 py-[14px] text-sm leading-none tracking-[-0.04em] text-appGray-600 transition-colors duration-300 placeholder:text-appGray-600 focus:outline-none lg:px-5 lg:py-[19px] lg:text-2xl lg:leading-none',
                        error ? 'border-red-500' : 'border-transparent',
                    )}
                    onClick={toggleOptions}
                >
                    <span className="truncate mr-2">
                        {value || placeholder}
                    </span>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classNames(
                            'w-[14px] h-[14px] transition-transform duration-300',
                            showOptions && 'rotate-180',
                        )}
                    >
                        <mask
                            id="mask0_1207_1541"
                            style={{ maskType: 'alpha' }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                        >
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask={'url(#mask0_1207_1541)'}>
                            <path
                                d="M12 15.3751L6 9.3751L7.4 7.9751L12 12.5751L16.6 7.9751L18 9.3751L12 15.3751Z"
                                fill="#1C1B1F"
                            />
                        </g>
                    </svg>
                </button>
                {showOptions && (
                    <div
                        ref={optionRef}
                        className="absolute z-50 -top-1 left-0 w-full -translate-y-full grid grid-cols-1 bg-white border border-appGray-400 overflow-hidden rounded-lg lg:rounded-2xl"
                    >
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className="flex w-full text-sm leading-none tracking-[-0.04em] text-appGray-600 transition-colors duration-300 hover:bg-[#FAFAFA] px-5 py-[14px] lg:text-2xl lg:leading-none lg:px-5 lg:py-4"
                                type="button"
                                onClick={(e) => handleOptionClick(option, e)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </label>
    );
};

export default SelectInput;
