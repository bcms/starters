import React from 'react';
import { navigate } from 'gatsby';
import { ReactComponent as SvgoArrow } from '@/assets/icons/arrow.svg';

const ErrorPage = () => {
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="w-screen h-[calc(100vh-150px)] flex flex-col gap-6 items-center justify-center lg:gap-10">
      <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
        Error page
      </h1>
      <button
        className="flex items-center px-[15px] py-2.5 text-appText-light bg-appAccent-300 rounded-[32px] transition-colors duration-300 hover:bg-appAccent"
        onClick={goBack}
      >
        <span className="text-sm leading-none tracking-[-0.41px] mr-1.5 md:text-base md:leading-none md:mr-2 lg:text-xl lg:leading-none">
          Go back home
        </span>
        <SvgoArrow className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
      </button>
    </div>
  );
};

export default ErrorPage;
