import { HeaderEntryMeta } from '@/bcms/types';
import React, { useState } from 'react';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import CartIcon from '@/assets/icons/cart.svg';
import Link from 'next/link';
import { BCMSImage } from 'next-plugin-bcms/components';
import classNames from 'classnames';
import ContentManager from '@/components/ContentManager';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  data: HeaderEntryMeta;
}
export const Header: React.FC<HeaderProps> = ({ data }) => {
  const { cartLength } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="relative z-10 container">
        <nav className="relative flex items-center justify-between py-6 md:py-8">
          <Link href="/">
            <a className="flex">
              <BCMSImage
                media={data.logo}
                className={classNames('w-[92px]', {
                  'max-md:grayscale max-md:brightness-0 max-md:invert':
                    showMobileMenu,
                })}
              />
            </a>
          </Link>
          <div className="flex items-center gap-5 md:gap-8">
            <ContentManager
              item={data.nav}
              className={classNames(
                'header--nav gap-6 text-xl max-md:text-white max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:text-appGray-700 md:text-base',
                {
                  'max-md:hidden': !showMobileMenu,
                },
              )}
            />
            <Link href="/shop/cart">
              <a className="flex items-center gap-2 leading-none px-3 py-2 bg-appGray-100 rounded-[5px] transition-colors duration-300 hover:bg-appGray-300">
                <CartIcon
                  className="translate-y-0.5 w-4 h-4"
                  filled={'true'}
                  fontcontrolled={false}
                />
                <span className="text-gray-700">My cart</span>
                <span className="font-bold font-sans text-sm">
                  ({cartLength})
                </span>
              </a>
            </Link>
            <button
              className="flex md:hidden"
              onClick={() => setShowMobileMenu((prevState) => !prevState)}
            >
              {showMobileMenu ? (
                <XIcon
                  className={classNames('w-6 h-6', {
                    'max-md:grayscale max-md:brightness-0 max-md:invert':
                      showMobileMenu,
                  })}
                />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
      )}
    </header>
  );
};
