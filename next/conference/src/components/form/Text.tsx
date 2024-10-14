import React from 'react';
import classNames from 'classnames';

interface TextInputProps {
    value: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'textarea';
    error?: string;
    onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    label,
    placeholder,
    type = 'text',
    error,
    onChange,
}) => {
    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        onChange(e.target.value);
    };

    return (
        <label className="relative flex flex-col">
            {label && (
                <div className="text-xs leading-none tracking-[-0.04em] text-appGray-500 mb-3 lg:text-xl lg:leading-none lg:mb-6">
                    {label}
                </div>
            )}
            {type !== 'textarea' ? (
                <input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    className={classNames(
                        'border rounded-lg px-5 py-[13px] text-sm leading-none tracking-[-0.04em] text-appGray-600 bg-[#FAFAFA] transition-colors duration-300 placeholder:text-appGray-600 focus:outline-none lg:px-5 lg:py-4 lg:text-2xl lg:leading-none',
                        error ? 'border-red-500' : 'border-transparent',
                    )}
                    onChange={handleInput}
                />
            ) : (
                <textarea
                    value={value}
                    placeholder={placeholder}
                    className={classNames(
                        'border rounded-lg px-5 py-[13px] text-sm leading-none tracking-[-0.04em] text-appGray-600 bg-[#FAFAFA] transition-colors duration-300 placeholder:text-appGray-600 resize-none h-[110px] focus:outline-none lg:px-5 lg:py-4 lg:text-2xl lg:leading-none lg:h-[256px]',
                        error ? 'border-red-500' : 'border-transparent',
                    )}
                    onChange={handleInput}
                />
            )}
        </label>
    );
};

export default TextInput;
