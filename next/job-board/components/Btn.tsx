import { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import ArrowIcon from '@/assets/icons/arrow.svg';

interface ButtonProps {
  className?: string;
  to?: string;
  theme?: 'accent' | 'pale' | 'dark' | 'accent-outline';
  hideArrow?: boolean;
  tag?: string;
  size?: 'sm' | 'regular';

  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  className,
  to,
  theme = 'accent',
  hideArrow,
  size = 'regular',
  children,
  onClick,
}) => {
  const showArrow = false;

  const buttonClasses = classnames(
    'group relative flex items-center text-sm leading-none font-medium tracking-[-0.41px] px-5 rounded-[32px] border transition-all duration-300 focus:outline-none hover:px-7 lg:px-7',
    {
      'bg-appAccent text-white border-transparent': theme === 'accent',
      'bg-appAccent/10 text-appAccent border-transparent': theme === 'pale',
      'bg-appText text-white border-transparent': theme === 'dark',
      'border border-appAccent text-appAccent': theme === 'accent-outline',
      'py-3 lg:py-4': size === 'sm',
      'py-4 lg:py-5': size === 'regular',
    },
    className,
  );

  return (
    <div>
      {to ? (
        <Link href={to}>
          <a className={buttonClasses}>{children}</a>
        </Link>
      ) : (
        <button onClick={onClick} className={buttonClasses}>
          {children}
        </button>
      )}
      {showArrow && !hideArrow && (
        <div className="w-[14px] h-[14px] opacity-0 ml-2 transition-all duration-300 group-hover:opacity-100">
          <ArrowIcon />
        </div>
      )}
    </div>
  );
};

export default Button;
