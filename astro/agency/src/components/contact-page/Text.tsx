import React from 'react';

interface Props {
    placeholder?: string;
    type?: 'text' | 'email' | 'textarea';
    error?: string;
    name: string;
    value: string;
    className?: string;
    onChange: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void;
}

const FormText: React.FC<Props> = ({
    placeholder,
    className,
    type = 'text',
    error,
    name,
    onChange,
    value,
}) => {
    return (
        <label className={className}>
            {type !== 'textarea' ? (
                <input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full border bg-transparent rounded-[.4375rem] px-4 py-3 font-Inter text-xs leading-none font-medium tracking-[-0.0175rem] transition-colors duration-300 placeholder:text-appText hover:border-appGray-100/50 focus:outline-none focus:border-appGray-100/50 ${
                        error ? 'border-red-500' : 'border-transparent'
                    }`}
                    style={{
                        boxShadow:
                            '0rem 0rem 0rem .0625rem #EDEDED, 0rem .0938rem .0625rem 0rem rgba(15, 18, 35, 0.14)',
                    }}
                    onChange={onChange}
                    name={name}
                />
            ) : (
                <textarea
                    value={value}
                    placeholder={placeholder}
                    className={`w-full border bg-transparent rounded-[.4375rem] px-4 py-3 font-Inter text-xs leading-none font-medium tracking-[-0.0175rem] transition-colors duration-300 placeholder:text-appText resize-none h-[20.875rem] hover:border-appGray-100/50 focus:outline-none focus:border-appGray-100/50 ${
                        error ? 'border-red-500' : 'border-transparent'
                    }`}
                    style={{
                        boxShadow:
                            '0rem 0rem 0rem .0625rem #EDEDED, 0rem .0938rem .0625rem 0rem rgba(15, 18, 35, 0.14)',
                    }}
                    onChange={onChange}
                    name={name}
                />
            )}
        </label>
    );
};

export default FormText;
