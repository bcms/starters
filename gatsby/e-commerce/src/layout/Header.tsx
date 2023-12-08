import { HeaderEntryMeta } from '@/bcms/types';
import React, { useState } from 'react';
import { ReactComponent as MenuIcon } from '@/src/assets/icons/menu.svg';
import { ReactComponent as XIcon } from '@/src/assets/icons/x.svg';
import { ReactComponent as CartIcon } from '@/src/assets/icons/cart.svg';
import { Link } from 'gatsby';
import { BCMSImage } from 'gatsby-source-bcms/components';
import classNames from 'classnames';
import { ContentManager } from '@/src/components/ContentManager';
import { useCart } from '@/src/context/CartContext';

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
          <Link className="flex" aria-label="Home page" to="/">
            <BCMSImage
              media={data.logo}
              svg
              className={classNames('w-[92px]', {
                'max-md:grayscale max-md:brightness-0 max-md:invert':
                  showMobileMenu,
              })}
            />
          </Link>
          <div className="flex items-center gap-5 md:gap-8">
            <ContentManager
              items={data.nav}
              className={classNames(
                'header--nav gap-6 text-xl max-md:text-white max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:text-appGray-700 md:text-base',
                {
                  'max-md:hidden': !showMobileMenu,
                },
              )}
            />
            <Link
              className="flex items-center gap-2 leading-none px-3 py-2 bg-appGray-100 rounded-[5px] transition-colors duration-300 hover:bg-appGray-300"
              to="/shop/cart"
            >
              <CartIcon
                className="translate-y-0.5 w-4 h-4 header--cartIcon"
                filled="false"
                fontcontrolled="false"
              />
              <span className="text-gray-700">My cart</span>
              <span className="font-bold font-sans text-sm">
                ({cartLength})
              </span>
            </Link>
            <button
              className="flex md:hidden"
              aria-label="Toggle mobile menu"
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
