import { HeaderEntryMeta } from '@/bcms/types';
import React, { useState } from 'react';
import Link from 'next/link';
import { BCMSImage } from 'next-plugin-bcms/components';
import classNames from 'classnames';
import ContentManager from '@/components/ContentManager';
import Btn from '@/components/Btn';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
interface HeaderProps {
  data: HeaderEntryMeta;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <header className="relative z-50">
      <div className="relative z-10 container">
        <nav className="relative flex items-center justify-between pt-6 lg:pt-8">
          <Link href="/">
            <a className="flex md:flex-1" aria-label="Home page">
              <BCMSImage
                media={data.logo}
                svg
                className={classNames('w-[60px] md:w-[101px]', {
                  'max-md:grayscale-0 max-md:brightness-[0.2] max-md:invert-0':
                    showMobileMenu,
                })}
              />
            </a>
          </Link>
          <ul
            className={classNames(
              'flex flex-col gap-4 max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row md:flex-1 md:justify-center lg:gap-8',
              {
                'flex flex-co': showMobileMenu,
                'max-md:hidden': !showMobileMenu,
              },
            )}
          >
            {data.nav.map((item, index) => (
              <li key={index}>
                <ContentManager
                  item={item}
                  className="text-lg leading-none tracking-[-0.41px] uppercase md:text-sm"
                />
              </li>
            ))}
            <li>
              <Link href="/">
                <a className="text-lg leading-none tracking-[-0.41px] uppercase md:hidden">
                  Contact us
                </a>
              </Link>
            </li>
          </ul>
          <div className="flex justify-end max-md:hidden md:flex-1">
            <Btn to="/contact" className="uppercase">
              <span>Contact us</span>
            </Btn>
          </div>
          <button
            className="flex md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            {showMobileMenu ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-appAccent md:hidden" />
      )}
    </header>
  );
};

export default Header;
