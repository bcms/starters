import React from 'react';
import { ReactComponent as SvgoEmail } from '../../assets/icons/email.svg';
import { ReactComponent as SvgoTel } from '../../assets/icons/tel.svg';

interface HeroProps {
  title: string;
  email: string;
  phone: string;
}

const Hero: React.FC<HeroProps> = ({ title, email, phone }) => {
  return (
    <section className="mt-6 mb-8 md:mt-10 md:mb-12 lg:mt-[4.75rem] lg:mb-16">
      <div className="container">
        <div className="flex flex-col items-center">
          <h1
            className="font-bold leading-none tracking-[-0.02rem] mb-4 
                       md:text-3xl md:leading-none 
                       lg:font-Inter lg:font-medium lg:text-5xl lg:leading-none lg:tracking-[-0.06rem] lg:mb-5"
          >
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3 lg:gap-4">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-appText rounded-[.4375rem] text-appText-light transition-colors duration-300 hover:bg-appText/80 lg:py-3"
              style={{
                boxShadow:
                  '0rem 0rem 0rem .0625rem #EDEDED, 0rem .0938rem .0625rem 0rem rgba(15, 18, 35, 0.14)',
              }}
            >
              <SvgoEmail className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="font-Inter text-xs font-medium leading-none tracking-[-0.015rem] lg:text-sm lg:leading-none lg:tracking-[-0.0175rem]">
                {email}
              </span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-appText rounded-[.4375rem] text-appText-light transition-colors duration-300 hover:bg-appText/80 lg:py-3"
              style={{
                boxShadow:
                  '0rem 0rem 0rem .0625rem #EDEDED, 0rem .0938rem .0625rem 0rem rgba(15, 18, 35, 0.14)',
              }}
            >
              <SvgoTel className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="font-Inter text-xs font-medium leading-none tracking-[-0.015rem] lg:text-sm lg:leading-none lg:tracking-[-0.0175rem]">
                {phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
