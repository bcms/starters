import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import classNames from 'classnames';

interface TitleProps {
  title: string;
  titleClassName?: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  titleClassName = '',
  className = '',
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const containerWidth =
        document.querySelector('.container')?.clientWidth || 0;

      gsap.to(titleRef.current, {
        x: containerWidth - titleRef.current.clientWidth,
        scrollTrigger: {
          start: 'top left',
          end: 'bottom right',
          scrub: 1,
        },
      });
    }
  }, []);
  return (
    <div className="flex">
      <h1 ref={titleRef} className={classNames(className, titleClassName)}>
        {title}
      </h1>
    </div>
  );
};

export default Title;
