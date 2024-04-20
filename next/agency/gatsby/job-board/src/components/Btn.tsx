import React, { FC, PropsWithChildren, useState } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';

interface ButtonProps {
  className?: string;
  to?: string;
  theme?: 'accent' | 'pale' | 'dark' | 'accent-outline';
  hideArrow?: boolean;
  full?: boolean;
  tag?: string;
  size?: 'sm' | 'regular';
  onClick?: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  to,
  theme = 'accent',
  hideArrow,
  size = 'regular',
  children,
  onClick,
  full,
}) => {
  const [showArrow, setShowArrow] = useState<boolean>(false);

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
    full && 'w-full',
    className,
  );

  const handleMouseOver = () => setShowArrow(true);
  const handleMouseLeave = () => setShowArrow(false);

  return (
    <div>
      {to ? (
        <Link
          className={buttonClasses}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          to={to}
        >
          {children}
          <CSSTransition
            in={showArrow}
            timeout={200}
            classNames="scaleBtnArrow"
            unmountOnExit
          >
            <ArrowIcon className="w-[14px] h-[14px] opacity-0 ml-2 group-hover:opacity-100" />
          </CSSTransition>
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={buttonClasses}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {children}
          <div>
            <ArrowIcon
              className={`arrow-wrapper w-[14px] h-[14px] ml-2 ${
                showArrow && !hideArrow ? 'show' : ''
              }`}
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default Button;
