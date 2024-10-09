import classNames from 'classnames';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

type Theme = 'light' | 'dark' | 'gray';
type Size = 'sm' | 'regular';

interface BtnProps extends PropsWithChildren {
    to?: string;
    theme?: Theme;
    size?: Size;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const Btn: React.FC<BtnProps> = ({
    theme = 'light',
    size = 'regular',
    to = undefined,
    children,
    className = '',
    disabled = false,
    onClick,
}) => {
    const classes = classNames(
        'flex items-center leading-none font-medium transition-colors duration-300 border border-transparent focus:outline-none lg:text-xl lg:leading-none',
        {
            'bg-appGray-200 text-appAccent hover:bg-appAccent hover:text-appGray-200 hover:border-appGray-200':
                theme === 'light',
            'bg-appAccent text-appGray-200 hover:bg-appGray-200 hover:text-appAccent hover:border-appAccent':
                theme === 'dark',
            'bg-[#F2F2F2] text-appGray-600 hover:border-appAccent disabled:bg-[#F2F5F3] disabled:text-[#BABDBB] disabled:hover:border-transparent':
                theme === 'gray',
            'px-4 py-[13px] rounded-lg text-sm lg:px-8 lg:py-[18px]':
                size === 'regular',
            'p-2.5 rounded-[5px] text-xs lg:px-6 lg:py-4 lg:rounded-lg':
                size === 'sm',
        },
        className,
    );
    return (
        <>
            {to ? (
                <Link href={to as string} className={classes}>
                    {children}
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={classes}
                >
                    {children}
                </button>
            )}
        </>
    );
};

export default Btn;
