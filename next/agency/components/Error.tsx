import React from 'react';
import { useRouter } from 'next/router';
import SvgoArrow from '@/assets/icons/arrow.svg';

const ErrorPage = () => {
  const router = useRouter();

  const goBack = () => {
    router.push('/');
  };

  return (
    <div className="w-screen h-[calc(100vh-150px)] flex flex-col gap-6 items-center justify-center lg:gap-10">
      <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
        Page Not Found
      </h1>
      <button
        className="flex items-center px-[15px] py-2.5 text-appText-light bg-appAccent-300 rounded-[32px] transition-colors duration-300 hover:bg-appAccent"
        onClick={goBack}
      >
        <span className="text-sm leading-none tracking-[-0.41px] mr-1.5 md:text-base md:leading-none md:mr-2 lg:text-xl lg:leading-none">
          Go back home
        </span>
        <SvgoArrow
          filled="true"
          fontcontrolled="false"
          className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
        />
      </button>
    </div>
  );
};

export default ErrorPage;
