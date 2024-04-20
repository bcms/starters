import React, { useState } from 'react';
import Link from 'next/link'; 
import Logo from '../../assets/media/logo.svg'; 
import SvgoX from '@/assets/icons/x.svg'; 
import SvgoMenu from '@/assets/icons/menu.svg';
import ContentManager from '../ContentManager'; 
import { HeaderEntryMeta } from '@/bcms/types';
import { BCMSEntryContentParsedItem, BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { useRouter } from 'next/router';
import ContactUs from '../ContactUs';

interface HeaderProps {
  data: HeaderEntryMeta; 
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const getHref = (item: BCMSPropRichTextDataParsed) => {
    let href = '';
    for (let i = 0; i < item.length; i++) {
      const e = item[i] as BCMSEntryContentParsedItem;
      const match = (e.value as string).match(/href="([^"]*)"/);
      if (match) {
        href = match[1];
        break;
      }
    }
    return href;
  };

  return (
    <header className="relative z-50">
      <div className="relative z-10 container">
        <nav className="relative flex items-center justify-between py-4 lg:py-5">
          <Link href="/" passHref> 
            <a className="flex" aria-label="Home page">
              <img
                src="/logo.svg"
                alt="Logo"
                className={`w-auto h-4 ${showMobileMenu ? 'max-md:grayscale max-md:brightness-0 max-md:invert' : ''}`}
              /> 
            </a>
          </Link>
          <ul className={`flex gap-5 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center ${showMobileMenu ? 'flex-col' : 'max-md:hidden'}`}>
            {data.nav.map((item, index) => (
              <li key={index}>
                <Link href={getHref(item)} passHref>
                  <a>
                    <ContentManager className={`relative font-Inter text-sm leading-none font-medium tracking-[-0.56px] max-md:text-appText-light transition-colors duration-300 md:hover:text-appText ${
                    getHref(item) === useRouter().asPath
                      ? 'text-appAccent-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:translate-y-full after:w-1.5 after:h-1.5 after:bg-appAccent-300 after:rounded-full max-md:after:opacity-0'
                      : 'text-appGray-300'
                  }`} item={item} /> 
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="max-md:hidden">
            <ContactUs />
          </div>
          <button
            className="flex md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          > 
            {showMobileMenu ? (
              <SvgoX 
                filled={true}
                fontcontrolled={false}
                className={`w-6 h-6 ${showMobileMenu ? 'max-md:grayscale max-md:brightness-0 max-md:invert' : ''}`} 
              />
            ) : (
              <SvgoMenu filled={true} fontcontrolled={false} className="w-6 h-6"  />
            )}
          </button>
        </nav>
      </div>
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
      )}
    </header>
  );
};

export default Header;
