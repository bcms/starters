'use client';

import classNames from 'classnames';
import React, { ChangeEventHandler, FC } from 'react';
import { ContactFormFieldName } from './Form';

type FormTextInputType = 'text' | 'email' | 'textarea';

export interface FormTextProps {
    label?: string;
    value: string;
    placeholder?: string;
    type?: FormTextInputType;
    error?: string;
    name: string;
    onChange: (value: string, field: ContactFormFieldName) => void;
}

export const FormText: FC<FormTextProps> = (props) => {
    const handleInputChange: ChangeEventHandler = (event): void => {
        const element = event.target as HTMLInputElement;
        props.onChange(element.value, element.name as ContactFormFieldName);
    };

    return (
        <label className="relative flex flex-col">
            {Boolean(props.label) && (
                <div className="text-sm leading-none tracking-[-0.41px] mb-4 md:text-base md:leading-none lg:text-xl lg:leading-none">
                    {props.label}
                </div>
            )}
            {props.type !== 'textarea' ? (
                <input
                    name={props.name}
                    value={props.value}
                    type={props.type}
                    placeholder={props.placeholder}
                    className={classNames(
                        'border bg-transparent rounded-3xl px-5 py-4 text-xs leading-none tracking-[-0.41px] transition-colors duration-300 placeholder:text-appText focus:outline-none md:text-sm md:leading-none lg:text-base lg:leading-none',
                        {
                            'border-red-500': props.error,
                            'border-[#CCCCCC]': !props.error,
                        },
                    )}
                    onChange={handleInputChange}
                />
            ) : (
                <textarea
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    className={classNames(
                        'border bg-transparent rounded-3xl px-5 py-4 text-xs leading-none tracking-[-0.41px] transition-colors duration-300 placeholder:text-appText resize-none h-[140px] focus:outline-none md:text-sm md:leading-none lg:text-base lg:leading-none lg:h-[228px]',
                        {
                            'border-red-500': props.error,
                            'border-[#CCCCCC]': !props.error,
                        },
                    )}
                    onChange={handleInputChange}
                />
            )}
        </label>
    );
};
