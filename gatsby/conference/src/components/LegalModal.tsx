import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import ContentManager from './ContentManager';
import { LegalEntry } from '../../bcms/types';
import gsap from 'gsap';
interface LegalEntriesProps {
  data: {
    nodes: Array<{
      bcms: LegalEntry;
    }>;
  };
  onClose: () => void;
  show: boolean
}

const LegalEntries: React.FC<LegalEntriesProps> = ({ show, data, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      gsap.from(modalRef.current, { opacity: 0, duration: 0.3 });
    } else {
      gsap.from(modalRef.current, { opacity: 1, duration: 0.3 });
    }
  }, [show]);
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
      <div ref={modalRef} className="relative z-10 bg-white rounded-2xl border border-[#D4D4D4] p-6 w-[962px] max-w-[95vw] max-h-[90vh] overflow-y-auto overscroll-contain lg:p-14">
        <div className="grid grid-cols-1 gap-6">
          {data.nodes.map((item, index) => (
            <div
              key={index}
              className="border border-[#E6E6E6] rounded-lg p-4 lg:p-6"
            >
              <h2
                className={classNames(
                  'leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-3',
                  item.bcms.meta.en?.title &&
                    'lg:text-[32px] lg:leading-none lg:mb-5',
                )}
              >
                {item.bcms.meta.en?.title}
              </h2>
              <ContentManager
                item={item.bcms.content.en || []}
                className={classNames(
                  'text-sm leading-[1.4] font-medium tracking-[-0.02em] text-appGray-500',
                  'lg:text-lg lg:leading-normal lg:tracking-[-0.04em]',
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full cursor-pointer bg-[#171717B2]"
        onClick={onClose}
      />
    </div>
  );
};

export default LegalEntries;
