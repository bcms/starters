import React from 'react';
import { PageProps, PortfolioPageData } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import { BCMSImage } from 'next-plugin-bcms/components';
import Link from 'next/link';
import ContentManager from '@/components/ContentManager';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-props';
import {
  PortfolioItemEntry,
  PortfolioItemEntryMeta,
  PortfolioPageEntry,
  PortfolioPageEntryMeta,
} from '@/bcms/types';

const PortfolioPage: React.FC<PageProps<PortfolioPageData>> = ({
  header,
  page,
  footer,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title={page.meta.title}
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="grid grid-cols-1 gap-[33px] lg:gap-20">
            {page.items.map((item, index) => (
              <Link
                v-for="(item, index) in data.page.items"
                key={index}
                href={`/portfolio/${item.slug}`}
              >
                <a>
                  <BCMSImage
                    media={item.gallery[0]}
                    options={{
                      sizes: {
                        exec: [
                          {
                            width: 1264,
                            height: 611,
                          },
                        ],
                      },
                    }}
                    className="w-full aspect-[2.07] cover rounded-[6px] overflow-hidden mb-4 lg:rounded-3xl lg:mb-12"
                  />
                  <div className="lg:flex lg:items-start lg:justify-between">
                    <h3 className="flex text-sm leading-none tracking-[-0.41px] font-Helvetica mb-3 md:text-2xl md:leading-none lg:text-[32px]">
                      {item.brand_name}
                      <span className="text-[10px] ml-1.5 md:text-sm lg:text-xl">
                        &#169;
                      </span>
                    </h3>
                    <ContentManager
                      item={item.description}
                      className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:max-w-[551px]"
                    />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<PortfolioPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const portfolioPage = (await client.entry.get({
      // Template name or ID
      template: 'portfolio_page',
      // Entry slug or ID
      entry: 'portfolio',
    })) as PortfolioPageEntry;
    if (!portfolioPage) {
      throw new Error('Portfolio page entry does not exist.');
    }
    const portfolioItems = (await client.entry.getAll({
      // Template name or ID
      template: 'portfolio_item',
    })) as PortfolioItemEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          meta: portfolioPage.meta.en as PortfolioPageEntryMeta,
          items: portfolioItems.map(
            (item) => item.meta.en as PortfolioItemEntryMeta,
          ),
        },
      },
    };
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default PortfolioPage;
