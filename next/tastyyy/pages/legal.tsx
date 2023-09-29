import { LegalPageData, PageProps } from '@/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { LegalPageEntry } from '@/bcms/types';
import { PageWrapper } from '@/components/PageWrapper';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';

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
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[850px] xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-12 lg:text-5xl lg:leading-none lg:mb-20">
              Legal
            </h1>
            <div className="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
              {page.entries.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#DBD9D5] rounded-[7px] p-6"
                >
                  <h2 className="leading-none tracking-[-0.41px] font-Gloock mb-[14px] lg:text-[32px] lg:leading-none lg:mb-5">
                    {item.meta.en?.title}
                  </h2>
                  <ContentManager
                    item={item.content.en || []}
                    className="text-sm leading-normal tracking-[-0.41px] text-appGray-200 lg:text-lg lg:leading-normal"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<LegalPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    const legalPage = (await client.entry.getAll({
      // Template name or ID
      template: 'legal_page',
    })) as LegalPageEntry[];

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
      notFound: true,
    };
  }
};

export default LegalPage;
