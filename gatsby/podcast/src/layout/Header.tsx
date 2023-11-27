import React, { useState } from 'react';
import { HeaderEntryMeta } from '@/bcms/types';
import {
  BCMSEntryContentParsedItem,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
import { Link } from 'gatsby';
import { BCMSImage } from 'gatsby-source-bcms/components';
import classNames from 'classnames';
import { ContentManager } from '@/src/components/ContentManager';
import { ReactComponent as MenuIcon } from '@/src/assets/icons/menu.svg';
import { ReactComponent as XIcon } from '@/src/assets/icons/x.svg';

interface HeaderProps {
  data: HeaderEntryMeta;
}
export const Header: React.FC<HeaderProps> = ({ data }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const route = window.location;
  const getNavLinkPath = (content: BCMSPropRichTextDataParsed) => {
    let path = '';

    for (let i = 0; i < content.length; i++) {
      const item = content[i] as BCMSEntryContentParsedItem;

      const href = (item.value as string).match(/href="([^"]*)"/)?.[1];

      if (href) {
        path = href;
        break;
      }
    }

    return path;
  };
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="relative z-10 container">
        <nav className="relative flex items-center justify-between pt-6 lg:pt-8">
          <Link to="/">
            <a className="flex" aria-label="Home page">
              <BCMSImage
                media={data.logo}
                svg
                className="w-[101px] md:w-[135px]"
              />
            </a>
          </Link>
          <ul
            className={classNames(
              'flex flex-col gap-4 max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row lg:gap-8',
              {
                'flex flex-col': showMobileMenu,
                'max-md:hidden': !showMobileMenu,
              },
            )}
          >
            {data.nav &&
              data.nav.map((item, index) => (
                <li key={index}>
                  <ContentManager
                    items={item}
                    className={classNames(
                      'text-lg leading-none font-semibold tracking-[-0.8px] md:text-xl md:leading-none',
                      {
                        'md:text-appGray-300':
                          route.pathname !== getNavLinkPath(item),
                      },
                    )}
                  />
                </li>
              ))}
          </ul>
          <button
            className="flex md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setShowMobileMenu((prevState) => !prevState)}
          >
            {showMobileMenu && <XIcon className="w-6 h-6" />}
            <MenuIcon className="w-6 h-6" />
          </button>
        </nav>
      </div>
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-appBody md:hidden" />
      )}
    </header>
  );
};
