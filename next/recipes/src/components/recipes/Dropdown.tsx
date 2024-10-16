import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import ChevronIcon from '@/assets/icons/chevron-down.svg';
import ArrowIcon from '@/assets/icons/arrow-right.svg';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Transition } from 'react-transition-group';

interface Props {
    value: string;
    options: string[];
    placeholder: string;
    dropdownPosition?: 'left' | 'right';
    onSelect: (value: string) => void;
}

export const RecipesDropdown: React.FC<Props> = ({
    onSelect,
    dropdownPosition = 'right',
    placeholder,
    options,
    value,
}) => {
    const [showOptions, setShowOptions] = useState(false);
    const dropdownOptionRef = useRef<HTMLDivElement | null>(null);
    const transitionRef = useRef<HTMLDivElement | null>(null);

    useClickOutside({
        callback: () => setShowOptions(false),
        ref: dropdownOptionRef,
    });

    const toggleOptions = () => {
        setShowOptions((prev) => !prev);
    };

    const handleOptionSelect = (option: string) => {
        if (option === value) {
            onSelect('');
        } else {
            onSelect(option);
        }
        setShowOptions(false);
    };

    return (
        <div className="relative" ref={dropdownOptionRef}>
            <button
                className="flex items-center justify-between border border-[#DEDEDE] rounded-md px-4 py-[13px] w-full lg:px-6 lg:py-5"
                onClick={toggleOptions}
            >
                <span
                    className={classnames(
                        'text-sm leading-none font-medium tracking-[-0.41px] transition-colors duration-300 lg:text-base lg:leading-none',
                        {
                            'text-appGray-400': !value,
                        },
                    )}
                >
                    {value || placeholder}
                </span>
                <ChevronIcon
                    className={classnames(
                        'w-[14px] h-[14px] transition-transform duration-300 lg:w-4 lg:h-4',
                        {
                            'rotate-180': showOptions,
                        },
                    )}
                />
            </button>
            <div>
                {showOptions && (
                    <Transition
                        appear={true}
                        mountOnEnter={true}
                        nodeRef={transitionRef}
                        in={showOptions}
                        timeout={300}
                    >
                        {(state) => (
                            <div
                                ref={transitionRef}
                                className={classnames(
                                    'absolute -bottom-1 w-full translate-y-full grid grid-cols-1 gap-px border border-[#EBEBEB] bg-[#EBEBEB] rounded-lg max-h-[194px] overflow-y-auto lg:-bottom-4 lg:w-[470px] lg:flex lg:flex-wrap lg:gap-4 lg:bg-white lg:p-6 xl:w-[636px]',
                                    {
                                        'right-0': dropdownPosition === 'left',
                                        'left-0': dropdownPosition === 'right',
                                    },
                                    `fade-${state}`,
                                )}
                            >
                                {options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={classnames(
                                            'group relative px-4 py-3 w-full text-sm leading-none font-medium tracking-[-0.41px] text-appGray-400 text-left transition-colors duration-300 hover:bg-[#EBEBEB] lg:w-max lg:rounded-[40px] lg:px-6 lg:py-4 lg:bg-transparent lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:w-full lg:before:h-full lg:before:bg-[#F7F7F7] lg:before:transition-all lg:before:duration-300 lg:before:rounded-[40px] lg:hover:before:bg-appAccent lg:hover:before:w-[calc(100%+32px)]',
                                            {
                                                'bg-[#EBEBEB] lg:before:bg-appAccent lg:text-white':
                                                    value === option,
                                                'bg-white lg:bg-transparent lg:text-appAccent':
                                                    value !== option,
                                            },
                                        )}
                                        style={{
                                            zIndex: options.length - index,
                                        }}
                                        onClick={() =>
                                            handleOptionSelect(option)
                                        }
                                    >
                                        <span className="relative z-10 transition-colors duration-300 group-hover:text-appGray-400 lg:group-hover:text-white">
                                            {option}
                                        </span>
                                        <ArrowIcon className="absolute top-1/2 -translate-y-1/2 -right-2.5 -translate-x-2 w-5 h-5 opacity-0 transition-all duration-300 text-white group-hover:opacity-100 group-hover:translate-x-1 max-lg:hidden" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </Transition>
                )}
            </div>
        </div>
    );
};
