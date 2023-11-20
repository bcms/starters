import React from 'react';
import { FooterEntryMeta } from '@/bcms/types';
import BCMSLogo from '@/src/assets/media/bcms-logo.svg';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { ContentManager } from '@/src/components/ContentManager';
interface FooterProps {
  data: FooterEntryMeta;
}
export const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer className="bg-appGray-100 pt-6 pb-[35px] md:pb-8 lg:pt-14">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-[auto,1fr] lg:mb-24">
          <div className="lg:max-w-[320px]">
            <BCMSImage media={data.logo} svg className="mb-3 lg:mb-4" />
            <ContentManager
              items={data.description}
              className="text-xs tracking-[-0.41px] font-medium leading-normal text-appGray-500 lg:text-base"
            />
          </div>
          <nav className="flex flex-wrap gap-x-12 gap-y-10 lg:justify-end lg:gap-x-10 xl:gap-x-[72px] xl:pr-[130px]">
            {data?.nav.map((col, index) => (
              <ContentManager
                key={index}
                items={col}
                className="footer--nav-col"
              />
            ))}
          </nav>
        </div>
        <div className="text-[#898C8A] leading-none font-medium tracking-[-0.41px] md:flex md:items-center md:justify-between">
          <a
            href="https://thebcms.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm max-md:mb-3 lg:text-base lg:leading-none"
          >
            Powered by
            <img
              src={BCMSLogo}
              className="w-[55px] ml-2 lg:w-[83px] lg:h-6 lg:ml-3"
            />
          </a>
          <div className="text-xs lg:text-base lg:leading-none">
            &copy; {new Date().getFullYear()} BCMS. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
