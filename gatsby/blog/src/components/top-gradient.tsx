import classNames from 'classnames';
import React, { FC } from 'react';

interface Props {
  className?: string;
}

export const TopGradient: FC<Props> = (props) => {
  return (
    <div
      className={classNames(
        'absolute -top-9 left-1/2 -translate-x-1/2 -translate-y-full bg-appAccent blur-[110px] w-[428px] h-[428px] rounded-full',
        props.className,
      )}
    />
  );
};
