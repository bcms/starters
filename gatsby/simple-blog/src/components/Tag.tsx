import React, { PropsWithChildren } from 'react';

interface Props {
    size?: 'md' | 'lg';
    className?: string;
    onClick?: () => void;
}

const Tag: React.FC<PropsWithChildren<Props>> = ({
    children,
    size = 'md',
    className = '',
    onClick,
}) => {
    const sizeClass =
        size === 'md'
            ? 'px-2 py-1 max-md:text-sm md:p-2'
            : 'px-3 py-2 text-xl font-medium rounded-lg md:px-5 md:py-4 md:text-2xl';

    return onClick ? (
        <button
            className={`border border-appGray-200 bg-appGray-100 flex leading-none rounded-lg ${sizeClass} ${className}`}
        >
            {children}
        </button>
    ) : (
        <div
            className={`border border-appGray-200 bg-appGray-100 flex leading-none rounded-lg ${sizeClass} ${className}`}
        >
            {children}
        </div>
    );
};

export default Tag;
