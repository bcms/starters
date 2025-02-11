'use client';

import React from 'react';
import classNames from 'classnames';

interface FormCheckProps {
    value: string;
    label: string;
    size?: 'default' | 'sm';
    onCheck: (value: string) => void;
    checked?: boolean;
}

export const FormCheck: React.FC<FormCheckProps> = ({
    value,
    label,
    size = 'default',
    onCheck,
    checked,
}) => {
    const handleCheck = (v: string) => {
        if (v) {
            onCheck(v);
        }
    };

    return (
        <label
            className={classNames(
                'relative flex items-center cursor-pointer',
                size === 'sm' ? 'gap-2' : 'gap-3',
            )}
        >
            <input
                checked={checked}
                value={value}
                type="checkbox"
                className="sr-only"
                onChange={(e) => {
                    handleCheck(e.target.value);
                }}
            />
            <div
                className={classNames(
                    'flex items-center justify-center rounded-sm bg-white border border-appGray-400 flex-shrink-0',
                    size === 'sm' ? 'w-[18px] h-[18px]' : 'w-6 h-6',
                )}
            >
                <div
                    className={classNames(
                        'bg-appText rounded-[1px] transition-opacity duration-300',
                        !checked ? '' : 'opacity-0',
                        size === 'sm' ? 'w-3 h-3' : 'w-4 h-4',
                    )}
                />
            </div>
            <div
                className={classNames(
                    'leading-none tracking-[-0.32px] select-none mb-1',
                    size === 'sm' ? '' : 'text-lg md:text-[24px]',
                )}
            >
                {label}
            </div>
        </label>
    );
};
