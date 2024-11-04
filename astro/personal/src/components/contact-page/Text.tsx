import ArrowIcon from '../../assets/icons/arrow.svg?raw';
import { type ChangeEvent } from 'react';
import classNames from 'classnames';

interface Props {
    value: string;
    type?: 'email' | 'text';
    isReadOnly?: boolean;
    placeholder?: string;
    label?: string;

    onChange?: (value: string) => void;

    className?: string;

    error?: boolean;
}
const FormText: React.FC<Props> = ({
    onChange,
    label,
    type = 'text',
    value,
    isReadOnly,
    placeholder,
    className,
    error = false,
}) => {
    const handleInput = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (onChange !== undefined) {
            onChange(event.target.value);
        }
    };

    return (
        <label className={classNames('flex flex-col', className)}>
            {label && (
                <div
                    className={classNames(
                        'text-sm leading-none tracking-[-0.41px] pb-3 border-b border-[#D9D9D9] transition-colors duration-300 lg:text-base lg:leading-none lg:pb-4',
                        { 'text-red-500': error },
                    )}
                >
                    {label}
                </div>
            )}
            <div className="flex items-center">
                {!isReadOnly && (
                    <div
                        dangerouslySetInnerHTML={{ __html: ArrowIcon }}
                        className="w-[14px] h-[14px] mr-2 lg:w-4 lg:h-4 lg:mr-2.5"
                    />
                )}
                <input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    readOnly={isReadOnly}
                    className="bg-transparent py-3 text-sm leading-none tracking-[-0.41px] w-full placeholder:text-appGray-400 focus:outline-none lg:py-4 lg:text-base lg:leading-none"
                    onChange={handleInput}
                />
            </div>
        </label>
    );
};

export default FormText;
