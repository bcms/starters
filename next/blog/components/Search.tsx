import SearchIcon from '@/assets/icons/search.svg';
import classNames from 'classnames';
import React, { FC } from 'react';
import NextImage from 'next/image';

interface Props {
  value: string;
  onEnter: () => void;
  onChange: (value: string) => void;
  className?: string;
}

export const Search: FC<Props> = ({ value, onEnter, onChange, className }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEnter();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(
        'flex items-center border border-appGray-100 rounded-[48px] px-4 max-w-[848px] mx-auto md:px-6 lg:px-8',
        className,
      )}
    >
      <NextImage
        src={SearchIcon}
        alt="Search"
        className="w-[14px] h-[14px] mr-1.5 md:w-6 md:h-6 md:mr-2.5 lg:w-8 lg:h-6 lg:mr-[14px]"
      />
      <label className="w-full">
        <input
          value={value}
          type="search"
          placeholder="Search"
          className="placeholder:text-appText bg-transparent py-[11px] text-sm leading-none tracking-[-0.41px] w-full focus:outline-none md:text-lg md:leading-none md:py-4 lg:text-2xl lg:leading-none lg:py-[21px]"
          onInput={handleInput}
        />
      </label>
    </form>
  );
};
