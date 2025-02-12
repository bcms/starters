import React, { type ButtonHTMLAttributes } from 'react';
import ArrowIcon from '../assets/icons/arrow.svg?raw';
import classNames from 'classnames';

export type BtnTheme = 'dark-green' | 'light-green' | 'orange';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    to?: string;
    theme: BtnTheme;
    label: string;
}

export const Btn: React.FC<BtnProps> = (props) => {
    const { to, theme, label, ...rest } = props;

    const classes = classNames(
        'relative flex items-center px-6 py-[16px] rounded-[40px] focus:outline-none',
        {
            'bg-appAccent-darkGreen text-white': theme === 'dark-green',
            'bg-appAccent-lightGreen': theme === 'light-green',
            'bg-appAccent-orange':
                theme !== 'light-green' && theme !== 'dark-green',
        },
    );
    return (
        <div>
            {to ? (
                <a href={to} className={classes}>
                    <span className="text-[20px] leading-none uppercase -translate-y-1 md:text-[32px]">
                        {label}
                    </span>
                    <div
                        dangerouslySetInnerHTML={{ __html: ArrowIcon }}
                        className="w-6 h-6 ml-2 fill-current md:w-8 md:h-8"
                    />
                </a>
            ) : (
                <button className={classes} {...rest}>
                    <span className="text-[20px] leading-none uppercase -translate-y-1 md:text-[32px]">
                        {label}
                    </span>
                    <div
                        dangerouslySetInnerHTML={{ __html: ArrowIcon }}
                        className="w-6 h-6 ml-2 fill-current md:w-8 md:h-8"
                    />
                </button>
            )}
        </div>
    );
};
