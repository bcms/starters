import { PageProps, PortfolioItemPageData } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { PortfolioItemEntry, PortfolioItemEntryMeta } from '@/bcms/types';
import { getHeaderAndFooter } from '@/utils/page-props';

const PortfolioItemPage: React.FC<PageProps<PortfolioItemPageData>> = ({
  header,
  footer,
  page,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="pt-6 pb-10 overflow-hidden md:pb-20 lg:pt-8 lg:pb-[120px]">
        <div className="relative mb-4 lg:mb-6">
          <div className="py-6">
            <div className="container">
              <div className="relative z-10 aspect-[1.23] md:aspect-[1.95]">
                <h1 className="text-xl leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[72px] lg:leading-none">
                  {page.meta.title}
                </h1>
                <div className="flex items-end justify-between gap-5 h-full">
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Project
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {page.meta.project_no.padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Brand name
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {page.meta.brand_name}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Role
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {page.meta.role}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Year
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {new Date(page.meta.year).getFullYear()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BCMSImage
            media={page.meta.gallery[0]}
            options={{
              sizes: {
                exec: [
                  {
                    width: 1440,
                    height: 740,
                  },
                ],
              },
            }}
            className="absolute top-0 left-0 w-full h-full cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-appText/80" />
        </div>
        <div className="container">
          <ContentManager
            item={page.meta.description}
            className="text-sm leading-[1.2] tracking-[-0.41px] max-w-[1138px] mb-8 lg:text-[40px] lg:leading-[1.2] lg:mb-[72px]"
          />
          <div className="grid grid-cols-3 gap-3 mb-4 lg:gap-8 lg:mb-6">
            {page.meta.gallery.slice(1).map((image, index) => (
              <BCMSImage
                key={index}
                media={image}
                className="portfolioItemPage--galleryImage w-full cover h-full"
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

interface ParamsI extends NextParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
  const client = getBcmsClient();
  const portfolioItems = (await client.entry.getAll({
    // Template name or ID
    template: 'portfolio_item',
  })) as PortfolioItemEntry[];
  const paths = portfolioItems.map((portfolio) => {
    return {
      params: {
        slug: portfolio?.meta?.en?.slug ?? '',
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PageProps<PortfolioItemPageData>
> = async ({ params }) => {
  const client = getBcmsClient();

  const headerFooterData = await getHeaderAndFooter(client);
  const portfolioItem = (await client.entry.get({
    template: 'portfolio_item',
    entry: params?.slug as string,
  })) as PortfolioItemEntry;

  if (!portfolioItem) {
    throw new Error('Portfolio page entry does not exist.');
  }

  return {
    props: {
      header: headerFooterData.header,
      footer: headerFooterData.footer,
      page: {
        meta: portfolioItem.meta.en as PortfolioItemEntryMeta,
      },
    },
  };
};

export default PortfolioItemPage;
