import ContentManager from '@/components/ContentManager';
import React from 'react';
import BCMSLogo from '@/assets/media/bcms-logo.svg';
import { FooterEntryMeta } from '@/bcms/types';

interface FooterProps {
  data: FooterEntryMeta;
}
const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer className="bg-appText py-10 md:py-12">
      <div className="container">
        <div className="md:grid md:grid-cols-[auto,1fr]">
          <ContentManager
            item={data.location}
            className="text-sm leading-[1.3] uppercase tracking-[-0.41px] text-appGray-500 text-center mb-8
                    md:text-base md:leading-[1.3] md:text-left"
          />
          <nav className="grid grid-cols-[repeat(2,auto)] justify-between gap-x-12 gap-y-8 mx-auto mb-10 max-md:max-w-[225px] md:mb-20 lg:grid-cols-[repeat(4,auto)] lg:gap-20 xl:gap-[128px]">
            {data.nav &&
              data.nav.map((col, index) => (
                <ContentManager
                  key={index}
                  item={col}
                  className="footer--nav-col"
                />
              ))}
          </nav>
        </div>
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between">
          <a
            href="https://thebcms.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center max-md:mb-[14px]"
          >
            <span className="text-sm leading-none tracking-[-0.41px] text-appBody mr-2 md:text-base md:leading-none md:mr-3">
              Powered by
            </span>
            <BCMSLogo className="w-[55px] md:w-[83px]" />
          </a>
          <div className="text-xs leading-none text-appGray-500 md:text-base md:leading-none md:text-appBody">
            &copy; {new Date().getFullYear()} BCMS. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
