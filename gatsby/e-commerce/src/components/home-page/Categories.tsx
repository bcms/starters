import { ProductCategoryEntryMeta } from '@/bcms/types';
import React from 'react';
import { BtnTheme } from '@/types';
import { Link } from 'gatsby';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { Btn } from '@/src/components/Btn';

interface HomepageCategoriesProps {
  data: Array<{
    meta: {
      en: ProductCategoryEntryMeta;
    };
    productsCount: number;
  }>;
  ctaTheme: BtnTheme;
}

export const HomepageCategories: React.FC<HomepageCategoriesProps> = ({
  data,
  ctaTheme,
}) => {
  console.log(data[0]);
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((category, index) => (
          <div
            key={index}
            className="group relative aspect-square flex items-end p-8 overflow-hidden"
          >
            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
              <h2 className="flex items-end flex-wrap gap-4 text-white leading-none">
                <span className="text-[32px] md:text-[40px]">
                  {category.meta.en.title}
                </span>
                <span className="text-[18px] md:text-[24px]">
                  ({category.productsCount} Product
                  {category.productsCount === 0 || category.productsCount > 1
                    ? 's'
                    : ''}
                  )
                </span>
              </h2>
            </div>
            <Link
              className="absolute z-10 inset-0 bg-black/60 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"
              to={`/shop${
                category.productsCount > 0
                  ? '?category=' + category.meta.en.slug
                  : ''
              }`}
            >
              <div className="text-white text-[28px] leading-none mb-6 md:text-[32px]">
                {category.meta.en.title}
              </div>
              <Btn theme={ctaTheme} label="Shop now" />
            </Link>
            <BCMSImage
              media={category.meta.en.gallery[0]}
              options={{
                sizes: {
                  exec: [
                    {
                      width: 640,
                    },
                    {
                      width: 1280,
                    },
                  ],
                },
              }}
              className="absolute inset-0 cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
