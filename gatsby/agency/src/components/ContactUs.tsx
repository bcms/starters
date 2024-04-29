import React from 'react';
import { Link } from 'gatsby';
import { ReactComponent as SvgoHeadphones } from '@/assets/icons/headphones.svg';

const ContactUs = ({ className }: { className?: string }) => {
  return (
    <Link 
      to="/contact"
      className={`${className} flex items-center gap-2 flex-shrink-0 bg-white px-[9px] py-2 rounded-[7px] transition-colors duration-300 hover:bg-appAccent-300 hover:text-appText-light lg:px-4 lg:py-3`}
      style={{
        boxShadow:
          '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
      }}
    >
      <SvgoHeadphones className="w-4 h-4" />
      <span className="font-Inter text-sm font-medium leading-none tracking-[-0.28px]">
        Contact Us
      </span>
    </Link>
  );
};

export default ContactUs;

