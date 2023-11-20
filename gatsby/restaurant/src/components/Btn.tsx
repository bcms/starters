import React, { PropsWithChildren, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { Link } from 'gatsby';

import { ReactComponent as ArrowIcon } from '@/src/assets/icons/arrow.svg';

import classnames from 'classnames';

interface ButtonLinkProps {
  to?: string;
  theme?: 'fill' | 'outline' | 'accent';
  hideArrow?: boolean;
  size?: 'sm' | 'regular' | 'lg';

  className?: string;

  onClick?: () => void;
}

const ButtonLink: React.FC<PropsWithChildren<ButtonLinkProps>> = ({
  to,
  theme = 'outline',
  hideArrow,
  size = 'regular',
  children,
  className,
  onClick,
}) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const transitionRef = useRef(null);
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
        <Link to={to}>
          <a className={linkClasses}>
            {children}
            {isArrowVisible && (
              <Transition
                nodeRef={transitionRef}
                in={isArrowVisible && !hideArrow}
                timeout={1000}
                appear={true}
              >
                {(state: any) => (
                  <ArrowIcon
                    ref={transitionRef}
                    className={classnames(
                      'w-[14px] h-[14px] opacity-0 ml-2 transition-all duration-300 group-hover:opacity-100',
                      `scaleBtnArrow-${state}`,
                    )}
                  />
                )}
              </Transition>
            )}
          </a>
        </Link>
      ) : (
        <button
          className={classnames(linkClasses, 'flex justify-center w-full')}
          onClick={onClick}
        >
          {children}
          <Transition
            nodeRef={transitionRef}
            in={isArrowVisible && !hideArrow}
            timeout={1000}
            appear={true}
          >
            {(state: any) => (
              <ArrowIcon
                ref={transitionRef}
                className={classnames(
                  'w-[14px] h-[14px] opacity-0 ml-2 transition-all duration-300 group-hover:opacity-100',
                  `scaleBtnArrow-${state}`,
                )}
              />
            )}
          </Transition>
        </button>
      )}
    </div>
  );
};

export default ButtonLink;
