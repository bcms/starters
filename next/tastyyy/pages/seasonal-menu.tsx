import React, { useEffect, useMemo, useState } from 'react';
import { PageProps, SeasonalMenuPageData } from '@/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  FoodItemEntry,
  FoodItemEntryMeta,
  MenuPageEntry,
  MenuPageEntryMeta,
  SeasonEntry,
  SeasonEntryMeta,
} from '@/bcms/types';
import { PageWrapper } from '@/components/PageWrapper';
import { useRouter } from 'next/router';
import ArchWithStar from '@/components/ArchWithStar';
import classnames from 'classnames';
import ContentManager from '@/components/ContentManager';
import { BCMSImage } from 'next-plugin-bcms/components';

const SeasonalMenuPage: React.FC<PageProps<SeasonalMenuPageData>> = ({
  page,
  header,
  footer,
}) => {
  const router = useRouter();
  const [activeSeason, setActiveSeason] = useState<string>('spring');
  useEffect(() => {
    if (router?.query?.s) {
      setActiveSeason(router?.query?.s as string);
    }
  }, []);

  const activeSeasonDescription = useMemo(() => {
    return (
      page.seasons.find((season) => season.title.toLowerCase() === activeSeason)
        ?.description || []
    );
  }, [activeSeason, page.seasons]);

  const filteredFoodItems = useMemo(() => {
    return (
      page.foodItems.filter((item) => {
        return item.seasons.find(
          (e) => e.meta.en?.title.toLowerCase() === activeSeason,
        );
      }) || []
    );
  }, [activeSeason, page.foodItems]);

  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[745px] xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none">
              {page.meta.title}
            </h1>
            <div className="mb-10 lg:mb-20">
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-8 md:flex md:items-center md:justify-center lg:gap-4 lg:mb-10">
                {page.seasons.map((season, index) => (
                  <button
                    key={index}
                    className={classnames(
                      'flex justify-center w-full px-[18px] py-3 border rounded-[32px] transition-colors duration-300 lg:max-w-max',
                      {
                        'border-appAccent bg-appAccent text-appBody':
                          season.title.toLowerCase() === activeSeason,
                        'border-appText':
                          season.title.toLowerCase() !== activeSeason,
                      },
                    )}
                    onClick={() => setActiveSeason(season.title.toLowerCase())}
                  >
                    <span className="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                      {season.title}
                    </span>
                  </button>
                ))}
              </div>
              <ContentManager
                item={activeSeasonDescription}
                className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base lg:leading-[1.3]"
              />
            </div>
          </div>
        </div>
        {filteredFoodItems.length > 0 ? (
          <div className="grid grid-cols-1">
            {filteredFoodItems.map((item) => (
              <div
                key={item.slug}
                className="relative px-6 py-[42px] md:py-20 lg:py-[130px]"
              >
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                  <h3 className="text-sm leading-none uppercase text-white font-Gloock max-w-[480px] mb-[14px] lg:text-[32px] lg:leading-none lg:mb-[18px]">
                    {item.title}
                  </h3>
                  <ContentManager
                    item={item.description}
                    className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 max-w-[480px] mb-4 lg:text-base lg:leading-[1.3] lg:mb-6"
                  />
                  <div className="px-6 py-[13px] flex max-w-max bg-[#9BA58F] rounded-[32px] text-sm leading-none text-white tracking-[-0.41px] lg:px-[18px] lg:py-3 lg:text-sm lg:leading-none">
                    ${item.price}
                  </div>
                </div>
                <BCMSImage
                  media={item.cover}
                  className="absolute top-0 left-0 w-full h-full cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
            No menu item found
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<SeasonalMenuPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    const menuPage = (await client.entry.get({
      // Template name or ID
      template: 'menu_page',
      // Entry slug or ID
      entry: 'menu',
    })) as MenuPageEntry;
    if (!menuPage) {
      throw new Error('Menu page entry does not exist.');
    }
    const seasonItems = (await client.entry.getAll({
      // Meal type name or ID
      template: 'season',
    })) as SeasonEntry[];
    const foodItems = (await client.entry.getAll({
      // Food item name or ID
      template: 'food_item',
    })) as FoodItemEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          meta: menuPage.meta.en as MenuPageEntryMeta,
          seasons: seasonItems.map((e) => e.meta.en) as SeasonEntryMeta[],
          foodItems: foodItems.map((e) => e.meta.en) as FoodItemEntryMeta[],
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default SeasonalMenuPage;
