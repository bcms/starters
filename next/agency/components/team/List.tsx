import React from 'react';
import ContentManager from '@/components/ContentManager';
import BCMSImage from 'next-plugin-bcms/components/image';
import { TeamMemberEntry } from '@/bcms/types';

interface ListProps {
  items: TeamMemberEntry[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <section className="mb-8 md:mb-14 lg:mb-20 xl:mb-32">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-4 lg:gap-y-12">
          {items.map(
            (item, index) =>
              item.meta.en && (
                <div key={index} className="flex flex-col gap-4">
                  <BCMSImage
                    media={item.meta.en.image}
                    options={{
                      sizes: {
                        exec: [
                          {
                            width: 820,
                            height: 902,
                          },
                        ],
                      },
                    }}
                    className="full aspect-[0.76] rounded-2xl overflow-hidden lg:aspect-[1.39]"
                    style={{
                      boxShadow:
                        '0px 0px 0px 0.227px #EDEDED, 0px 0.34px 0.227px 0px rgba(15, 18, 35, 0.14)',
                    }}
                  />
                  <div className="flex flex-col gap-3">
                    <h3 className="font-Inter text-sm font-semibold leading-[1.2] tracking-[-0.28px] lg:text-base lg:leading-none lg:tracking-[-0.32px]">
                      {item.meta.en.title}
                    </h3>
                    <ContentManager
                      item={item.meta.en.description}
                      className="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] lg:text-base lg:leading-[1.4] lg:tracking-[-0.32px] lg:max-w-[85%]"
                    />
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </section>
  );
};

export default List;
