import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import ArrowIcon from '@/assets/icons/arrow.svg';

interface Props {
    className?: string;
    to?: string;
    theme?: 'accent' | 'pale' | 'dark' | 'accent-outline';
    hideArrow?: boolean;
    tag?: string;
    size?: 'sm' | 'regular';
    onClick?: () => void;
}

const Button: FC<PropsWithChildren<Props>> = ({
    className,
    to,
    theme = 'accent',
    hideArrow,
    size = 'regular',
    children,
    onClick,
}) => {
    const buttonClasses = classnames(
        'group relative flex items-center text-sm leading-none font-medium tracking-[-0.41px] px-5 rounded-[32px] border transition-all duration-300 focus:outline-none hover:px-7 lg:px-7',
        {
            'bg-appAccent text-white border-transparent': theme === 'accent',
            'bg-appAccent/10 text-appAccent border-transparent':
                theme === 'pale',
            'bg-appText text-white border-transparent': theme === 'dark',
            'border border-appAccent text-appAccent':
                theme === 'accent-outline',
            'py-3 lg:py-4': size === 'sm',
            'py-4 lg:py-5': size === 'regular',
        },
        className,
    );

    const arrowClass = classnames(
        'w-0 h-3.5 opacity-0 ml-2 will-change-transform transition-all duration-300 group-hover:opacity-100 group-hover:w-3.5',
    );

    return (
        <>
            {to ? (
                <Link href={to} className={buttonClasses}>
                    {children}
                    {!hideArrow && <ArrowIcon className={arrowClass} />}
                </Link>
            ) : (
                <button onClick={onClick} className={buttonClasses}>
                    {children}
                    {!hideArrow && <ArrowIcon className={arrowClass} />}
                </button>
            )}
        </>
    );
};

export default Button;
