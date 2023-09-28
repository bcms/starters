import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import ArrowIcon from '@/assets/icons/arrow.svg';
import classnames from 'classnames';

interface ButtonLinkProps {
  to?: string;
  theme?: 'fill' | 'outline' | 'accent';
  hideArrow?: boolean;
  size?: 'sm' | 'regular' | 'lg';

  className?: string;

  onClick?: () => void;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  to,
  theme = 'outline',
  hideArrow,
  size = 'regular',
  children,
  className,
  onClick,
}) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  const handleMouseOver = () => {
    setIsArrowVisible(true);
  };

  const handleMouseLeave = () => {
    setIsArrowVisible(false);
  };

  const linkClasses = classnames(
    'group relative flex items-center text-sm leading-none rounded-[32px] border transition-all duration-300 focus:outline-none lg:text-base lg:leading-none',
    {
      'bg-[#D1D0C7] text-white border-transparent': theme === 'fill',
      'bg-appAccent text-white border-transparent': theme === 'accent',
      'border-appText': theme !== 'fill' && theme !== 'accent',
      'px-4 py-[17px] lg:p-6': size === 'lg',
      'px-4 py-[13px] md:px-6 md:py-4': size === 'regular',
    },
  );

  return (
    <div
      className={className}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {to ? (
        <Link href={to}>
          <a className={linkClasses}>
            {children}
            {isArrowVisible && (
              <CSSTransition
                classNames="scaleBtnArrow"
                in={isArrowVisible && !hideArrow}
                timeout={1000}
              >
                <ArrowIcon
                  className={classnames(
                    'w-[14px] h-[14px] opacity-0 ml-2 transition-all duration-300 group-hover:opacity-100',
                  )}
                />
              </CSSTransition>
            )}
          </a>
        </Link>
      ) : (
        <button
          className={classnames(linkClasses, 'flex justify-center w-full')}
          onClick={onClick}
        >
          {children}
          <CSSTransition
            classNames="scaleBtnArrow"
            in={isArrowVisible && !hideArrow}
            timeout={1000}
          >
            <ArrowIcon
              className={classnames(
                'w-[14px] h-[14px] opacity-0 ml-2 transition-all duration-300 group-hover:opacity-100',
              )}
            />
          </CSSTransition>
        </button>
      )}
    </div>
  );
};

export default ButtonLink;
