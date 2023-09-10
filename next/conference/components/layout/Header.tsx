import React, { useState } from 'react';
import Link from 'next/link';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '../ContentManager';
import ContactForm from '../ContactForm';
import { HeaderEntryMeta } from '@/bcms/types';

interface HeaderProps {
  data: HeaderEntryMeta;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <header>
      <div className="container">
        <nav className="flex items-center justify-between pt-6 pb-8 lg:pt-12 lg:pb-[72px]">
          <Link href="/">
            <a className="flex">
              <BCMSImage media={data.logo} svg className="w-[140px]" />
            </a>
          </Link>
          <ul className="flex items-center space-x-4 lg:space-x-10">
            {data.nav.map((item, index) => (
              <li
                key={index}
                className={index === 0 ? 'cursor-pointer' : ''}
                onClick={() => index === 0 && setShowContactForm(true)}
              >
                <ContentManager
                  item={item}
                  className="text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-xl lg:leading-none"
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </header>
  );
};

export default Header;
