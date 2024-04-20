import React from 'react';
import { FooterEntryMeta } from '@/bcms/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as BCMSLogo } from '@/src/assets/media/bcms-logo.svg';
import { ContentManager } from '@/src/components/ContentManager';

interface FooterProps {
  data: FooterEntryMeta;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer className="bg-appGray-200 pt-[72px]">
      <div className="container">
        <nav className="grid grid-cols-1 gap-[55px] pb-14 border-b border-[#ccc] md:grid-cols-2 lg:grid-cols-4">
          {data.nav_columns.map((col, index) => (
            <div key={index}>
              <ContentManager items={col} className="footer--col" />
            </div>
          ))}
        </nav>
        <div className="py-10">
          <a
            href="https://thebcms.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5"
          >
            <span className="leading-none tracking-[-0.41px] text-gray-700">
              Powered by
            </span>
            <BCMSLogo className="w-[60px] lg:w-[83px]" fontcontrolled="false" />
          </a>
        </div>
      </div>
    </footer>
  );
};
