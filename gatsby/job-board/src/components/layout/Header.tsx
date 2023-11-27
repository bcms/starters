import React, { FC } from 'react';
import { HeaderEntryMeta } from '../../../bcms/types';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { Link } from 'gatsby';
import ContentManager from '@/components/ContentManager';

interface HeaderProps {
  data: HeaderEntryMeta;
}

const Header: FC<HeaderProps> = ({ data }) => {
  return (
    <header className="relative z-50">
      <nav>
        <div className="bg-appText py-[14px] lg:hidden">
          <div className="container">
            <div className="flex justify-center">
              <ContentManager
                item={data.job_cta}
                className="header--jobCta text-appGray-600 text-xs leading-none tracking-[-0.41px]"
              />
            </div>
          </div>
        </div>
        <div className="pt-6 lg:py-4 lg:border-b lg:border-appGray-200">
          <div className="container">
            <div className="flex items-center justify-between">
              <Link className="flex lg:flex-1" aria-label="Home page" to="/">
                <BCMSImage
                  media={data.logo}
                  svg
                  className="w-[90px] lg:w-[115px]"
                />
              </Link>
              <div className="flex justify-center flex-1 max-lg:hidden">
                <ContentManager
                  item={data.job_cta}
                  className="header--jobCta text-appGray-600 text-sm leading-none tracking-[-0.41px]"
                />
              </div>
              <div className="flex items-center gap-2.5 lg:flex-1 lg:justify-end lg:gap-4">
                {data.buttons.map((btn, index) => (
                  <Link 
                    key={index} 
                    to={btn.path ?? ''}
                    className={`flex items-center rounded-[32px] px-[14px] py-2.5 border transition-all duration-300 lg:px-6 lg:py-[13px] ${
                      index === 0
                        ? ' border-appText hover:border-transparent hover:bg-appGray-100'
                        : 'bg-appText border-transparent text-white'
                    }`}
                  >
                    
                    <span className="text-xs leading-none font-medium tracking-[-0.41px] mr-1.5 lg:text-sm lg:leading-none lg:mr-2">
                      {btn.label}
                    </span>
                    <BCMSImage
                      media={btn.icon}
                      svg
                      className="w-3 h-3 lg:w-[14px] lg:h-[14px]"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
