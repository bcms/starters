import { Link } from 'gatsby';
import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { HeaderEntryMeta } from '../../bcms/types';
import MenuIcon from '../assets/icons/menu.svg';
import XIcon from '../assets/icons/x.svg';
import { ContentManager, TopGradient } from '../components';
import { BCMSImage } from 'gatsby-source-bcms/components';

interface Props {
  data: HeaderEntryMeta;
}

export const Header: FC<Props> = ({ data }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <header className="relative z-50">
      <div className="relative z-10 container">
        <nav className="relative flex items-center justify-between pt-6">
          <Link to="/" className="flex" aria-label="Home page">
            <BCMSImage
              media={data.logo}
              svg
              className={classNames(
                'w-[125px] md:w-[165px]',
                showMobileMenu &&
                  'max-md:grayscale max-md:brightness-0 max-md:invert',
              )}
            />
          </Link>
          <ul
            className={classNames(
              'flex gap-6 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center lg:gap-10',
              showMobileMenu ? 'flex-col' : 'max-md:hidden',
            )}
          >
            {data.nav.map((item, index) => (
              <li key={index}>
                <ContentManager
                  items={item}
                  className="text-xl leading-none tracking-[-0.41px] max-md:text-white"
                  widgetComponents={{}}
                />
              </li>
            ))}
          </ul>
          <button
            className="flex md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <img
                src={XIcon}
                className={`w-6 h-6 ${
                  showMobileMenu
                    ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                    : ''
                }`}
              />
            ) : (
              <img src={MenuIcon} className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>
      {showMobileMenu && (
        <div>
          <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
          <TopGradient className="md:hidden" />
        </div>
      )}
    </header>
  );
};
