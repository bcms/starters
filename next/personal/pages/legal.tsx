import { LegalPageEntry } from '@/bcms/types';
import { PageProps, LegalPageData } from '@/types';
import { getHeaderAndFooter } from '@/utils/page-props';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import ContentManager from '@/components/ContentManager';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
const LegalPage: React.FC<PageProps<LegalPageData>> = ({
  header,
  footer,
  page,
}) => {
  return (
    <PageWrapper
      defaultTitle="Legal"
      page={page}
      header={header}
      footer={footer}
    >
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title="Legal Page"
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="grid grid-cols-1 gap-8 lg:gap-14">
            {page.entries &&
              page.entries.map((item, index) => (
                <div
                  key={index}
                  className="lg:grid lg:grid-cols-[300px,1fr] lg:items-start lg:gap-[100px]"
                >
                  <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px]">
                    {item.meta.en?.title}
                  </h2>
                  <ContentManager
                    item={item.content.en || []}
                    className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-2xl lg:leading-[1.35] lg:text-appGray-500"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<LegalPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const legalPage = (await client.entry.getAll({
      // Template name or ID
      template: 'legal_page',
    })) as LegalPageEntry[];
    if (!legalPage) {
      throw new Error('Legal page entry does not exist.');
    }

    return {
      props: {
        header,
        footer,
        page: {
          entries: legalPage,
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

export default LegalPage;
