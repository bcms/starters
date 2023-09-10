import React, { useState } from 'react';
import Link from 'next/link';
import {BCMSImage} from 'next-plugin-bcms/components';
import BCMSLogo from '@/assets/media/bcms-logo.svg';
import LegalModal from '../LegalModal';
import { FooterPageData } from '@/types/footer';
import NextImage from 'next/image';
interface FooterProps {
    data: FooterPageData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const [showLegalModal, setShowLegalModal] = useState(false);

  return (
    <footer className="bg-black py-8 lg:py-14">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center space-x-8 mb-14 lg:space-x-[74px] lg:mb-[72px]">
            {data.meta.social.map((item, index) => (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                <BCMSImage media={item.icon} className="w-6 h-6 lg:w-8 lg:h-8" svg={true} />
              </a>
            ))}
          </div>
          <div className="flex flex-col text-appGray-100 lg:flex-row lg:w-full lg:justify-between">
            <div className="flex items-center space-x-1.5 text-sm leading-none tracking-[-0.41px] max-lg:mb-4 lg:text-base lg:leading-none lg:order-3">
              <Link href={`mailto:${data.meta.email}`} className="flex">
                {data.meta.email}
              </Link>
              <div className="w-[3px] h-[3px] rounded-full bg-appGray-100" />
              <button onClick={() => setShowLegalModal(true)}>Legal page</button>
            </div>
            <div className="flex items-end text-xs leading-none tracking-[-0.41px] max-lg:mb-8 lg:text-base lg:leading-none lg:order-1">
                            &copy; 2023 CONference. All rights reserved
            </div>
            <a href="https://thebcms.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center lg:order-2">
              <span className="text-sm leading-none font-medium tracking-[-0.41px] mr-2 lg:text-base lg:leading-none lg:mr-1.5">
                Powered by
              </span>
              <NextImage src={BCMSLogo} className="w-[55px] lg:w-[83px]" />
            </a>
          </div>
        </div>
      </div>
      {showLegalModal && <LegalModal data={data.legal} onClose={() => setShowLegalModal(false)} />}
    </footer>
  );
};

export default Footer;
