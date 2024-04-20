import { TextWithImageGroup } from '@/bcms/types';
import React from 'react';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';

interface AboutPageTextImageProps {
  data: TextWithImageGroup[];
}

const AboutPageTextImage: React.FC<AboutPageTextImageProps> = ({ data }) => {
  return (
    <section className="relative mb-14 md:py-20 md:mb-20 lg:py-[104px] lg:mb-[120px]">
      <div className="container max-w-[1198px]">
        <div className="grid grid-cols-1 gap-8 md:gap-20 lg:gap-[112px]">
          {data &&
            data.map((col, index) => (
              <div
                key={index}
                className="md:flex md:items-center md:even:flex-row-reverse md:gap-20 lg:gap-[112px]"
              >
                <BCMSImage
                  media={col.image}
                  options={{
                    sizes: {
                      exec: [
                        {
                          width: 654,
                          height: 384,
                        },
                        {
                          width: 1022,
                          height: 750,
                        },
                      ],
                    },
                  }}
                  className="w-full cover aspect-[1.7] max-md:mb-4 md:flex-1 lg:aspect-[1.36]"
                />
                <ContentManager
                  item={col.text}
                  parentClassName="text-xs leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 md:flex-1 lg:text-[22px] lg:leading-[1.3]"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#D9D9D9] max-md:hidden" />
    </section>
  );
};

export default AboutPageTextImage;
