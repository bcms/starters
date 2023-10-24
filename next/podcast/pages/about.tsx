import { AboutPageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { AboutPageEntry, AboutPageEntryMeta } from '@/bcms/types';
import { getHeaderAndFooter } from '@/utils/page-props';

const AboutPage: React.FC<PageProps<AboutPageData>> = ({
  header,
  page,
  footer,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]">
        <div className="relative aspect-square rounded overflow-hidden mb-6 md:aspect-[2.47] lg:rounded-2xl lg:mb-10">
          <h1 className="absolute z-10 bottom-6 left-6 text-lg leading-none font-medium tracking-[-0.41px] lg:bottom-10 lg:left-10 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px]">
            {page.meta.title}
          </h1>
          <BCMSImage
            media={page.meta.cover}
            options={{
              sizes: {
                exec: [
                  {
                    width: 654,
                    height: 654,
                  },
                  {
                    width: 768,
                    height: 291,
                  },
                  {
                    width: 1344,
                    height: 544,
                  },
                ],
              },
            }}
            className="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {page.meta.content.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-appGray-600 rounded-2xl bg-appBody lg:p-8"
            >
              <ContentManager item={item} className="aboutPage--content" />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<AboutPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    const aboutPage = (await client.entry.get({
      // Template name or ID
      template: 'about_page',
      // Entry slug or ID
      entry: 'about-us',
    })) as AboutPageEntry;

    if (!aboutPage) {
      throw new Error('About page entry does not exist.');
    }
    return {
      props: {
        header,
        footer,
        page: {
          meta: aboutPage.meta.en as AboutPageEntryMeta,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default AboutPage;
