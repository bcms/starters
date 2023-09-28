import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Btn from '@/components/Btn';
import classnames from 'classnames';
import { BCMSPropMediaDataParsed } from '@becomes/cms-client/types';
import { BCMSImage } from 'next-plugin-bcms/components';

interface HomepageMapProps {
  map: BCMSPropMediaDataParsed;
}
const HomepageMap: React.FC<HomepageMapProps> = ({ map }) => {
  const [showMap, setShowMap] = useState<boolean>(false);

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapRef?.current && !mapRef?.current?.contains(event.target as Node)) {
        setShowMap(false);
      }
    };

    if (showMap) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMap]);
  return (
    <div className="relative" ref={mapRef}>
      <button
        className={classnames(
          'flex text-xs leading-none text-appGray-400 hover:underline lg:text-sm lg:leading-none',
          { underline: showMap },
        )}
        onClick={() => setShowMap((prev) => !prev)}
      >
        Open maps
      </button>
      {showMap && (
        <CSSTransition
          classNames="fade"
          appear={true}
          in={showMap}
          timeout={300}
          unmountOnExit={true}
        >
          <div className="absolute z-50 bottom-0 w-[calc(100vw-48px)] pointer-events-none">
            <div className="relative z-10 top-4 translate-y-full bg-[#E5E4DA] rounded-2xl p-4 pb-6 xl:p-2 xl:w-[440px]">
              <BCMSImage
                media={map}
                options={{
                  sizes: {
                    exec: [
                      {
                        width: 848,
                        height: 480,
                      },
                    ],
                  },
                }}
                className="w-full h-auto cover rounded-[10px] overflow-hidden pointer-events-auto"
              />
              <div className="grid grid-cols-2 gap-3 mt-6 pointer-events-auto xl:hidden">
                <Btn
                  theme="fill"
                  hide-arrow
                  className="justify-center uppercase"
                  onClick={() => setShowMap(false)}
                >
                  <span className="text-appText">Close</span>
                </Btn>
                <Btn
                  hide-arrow
                  className="justify-center uppercase"
                  onClick={() => setShowMap(false)}
                >
                  <span>Open maps</span>
                </Btn>
              </div>
            </div>
            <div
              className="fixed top-0 left-0 w-screen h-screen bg-[#17171799] cursor-pointer xl:hidden"
              onClick={() => setShowMap(false)}
            />
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default HomepageMap;
