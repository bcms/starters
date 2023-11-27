import React, { useMemo, useRef, useState } from 'react';
import { BCMSImage } from 'gatsby-source-bcms/components';
import LocationIcon from '@/assets/icons/location.svg';
import { JobPageData, PageData } from '../../types';
import { PageWrapper } from '@/components/PageWrapper';
import { StaticImage } from 'gatsby-plugin-image';
import ContentManager from '@/components/ContentManager';
import Btn from '@/components/Btn';
import JobsCard from '@/components/jobs/Card';
import ApplyModal from '@/components/jobs/ApplyModal';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { HeaderEntryMeta, FooterEntryMeta, JobEntryMeta, JobEntry } from '../../bcms/types';
import { graphql } from 'gatsby';

const JobPage: React.FC<{
  data: {
    header: {
      bcms: {
        meta: {
          en: HeaderEntryMeta;
        };
      };
    };
    footer: {
      bcms: {
        meta: {
          en: FooterEntryMeta;
        };
      };
    };
    page: {
      bcms: {
        meta: {
          en: JobEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    jobs: {
      nodes: Array<{
        bcms: JobEntry;
      }>;
    };
  };
}> = ({ data }) => {
  const meta = useMemo(() => data.page.bcms.meta.en, []);
  const company = useMemo(() => data.page.bcms.meta.en.company.jobCompany?.meta.en, []);

  const [jobsPerPage] = useState<number>(9);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);

  const sectionDOM = useRef<HTMLDivElement>(null);

  const filteredJobs = useMemo(() => {
    return data.jobs.nodes.slice(0, paginationPage * jobsPerPage) || [];
  }, []);

  const loadMore = () => setPaginationPage((prev) => prev++);

  const scrollToTop = () => {
    if (sectionDOM?.current) {
      window.scrollTo({
        top: sectionDOM.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PageWrapper page={data.page} header={data.header} footer={data.footer } location={`/jobs/${data.page.bcms.meta.en.slug}`}>
      <div className="relative mt-6 mb-10 lg:mt-0 lg:mb-[72px]">
        <BCMSImage
          media={meta.cover}
          options={{
            sizes: {
              exec: [
                {
                  width: 640,
                  height: 232,
                },
                {
                  width: 1280,
                  height: 464,
                },
                {
                  width: 1920,
                  height: 696,
                },
              ],
            },
          }}
          className="w-full aspect-[2.76] cover lg:aspect-[3.71]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
      </div>
      <div className="container">
        <div className="mb-12 lg:grid lg:grid-cols-[1fr,380px] lg:gap-10 lg:items-start lg:mb-[104px]">
          <div className="bg-appGray-100 rounded-lg lg:rounded-[14px]">
            <div className="flex items-center justify-between rounded-t-lg bg-[#C9C8C3] p-4 lg:px-8 lg:py-6 lg:rounded-t-[14px]">
              <div className="flex items-center">
                <BCMSImage
                  media={meta.avatar}
                  options={{
                    sizes: {
                      exec: [
                        {
                          width: 96,
                          height: 96,
                        },
                      ],
                    },
                  }}
                  className="w-8 h-8 rounded-full cover mr-3 lg:w-12 lg:h-12 lg:mr-[14px]"
                />
                <div>
                  <h1 className="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-1.5 lg:text-base lg:leading-none lg:mb-2.5">
                    {meta.title}
                  </h1>
                  <div className="flex items-center">
                    <StaticImage
                      src={LocationIcon}
                      alt="Icon"
                      className="w-3 h-3 flex-shrink-0 text-appGray-600 mr-1 lg:w-[14px] lg:h-[14px]"
                    />
                    <span className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none">
                      {meta.title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs leading-none font-medium tracking-[-0.41px] text-[#7A7A77] lg:text-sm lg:leading-none">
                Posted 9h ago
              </div>
            </div>
            <div>
              <div className="px-4 py-6 border-b border-[#CFCDC8] lg:p-8">
                <div className="flex items-center px-3 py-1.5 rounded-[5px] bg-[#C9C8C3] max-w-max mb-5 lg:py-[9px] lg:mb-6">
                  <div className="w-[5px] h-[5px] rounded-full bg-appAccent mr-1.5 lg:w-2 lg:h-2" />
                  <span className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none">
                    Job description
                  </span>
                </div>
                <ContentManager
                  item={meta.description_extended}
                  className="job--rt text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
                />
              </div>
              <div className="px-4 py-6 border-b border-[#CFCDC8] lg:p-8">
                <div className="flex items-center px-3 py-1.5 rounded-[5px] bg-[#C9C8C3] max-w-max mb-5 lg:py-[9px] lg:mb-6">
                  <div className="w-[5px] h-[5px] rounded-full bg-appAccent mr-1.5 lg:w-2 lg:h-2" />
                  <span className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none">
                    Responsibilities
                  </span>
                </div>
                <ContentManager
                  item={meta.responsibilities}
                  className="job--rt text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
                />
              </div>
              <div className="px-4 py-6 lg:p-8">
                <div className="flex items-center px-3 py-1.5 rounded-[5px] bg-[#C9C8C3] max-w-max mb-5 lg:py-[9px] lg:mb-6">
                  <div className="w-[5px] h-[5px] rounded-full bg-appAccent mr-1.5 lg:w-2 lg:h-2" />
                  <span className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none">
                    Job details
                  </span>
                </div>
                <ContentManager
                  item={meta.details}
                  className="job--rt text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 mb-12 lg:hidden">
            <Btn
              size="sm"
              className="justify-center w-full"
              onClick={() => setShowApplyModal(true)}
            >
              <span>Apply for this job</span>
            </Btn>
          </div>
          {company && (
            <div className="border border-[#B0AEAB] bg-appGray-100 rounded-lg p-4 pb-6 mb-12 lg:p-8 lg:rounded-[14px]">
              <div className="flex items-center mb-4 lg:mb-[18px]">
                <div className="flex items-center justify-center w-8 h-8 border border-[#CFCCC7] rounded-full p-1 mr-3 lg:w-12 lg:h-12 lg:p-0 lg:mr-4">
                  <BCMSImage media={company.logo} svg />
                </div>
                <div className="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay lg:text-base lg:leading-none">
                  {company.title}
                </div>
              </div>
              <ContentManager
                item={company.description}
                className="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-sm lg:leading-normal"
              />
              <div className="mt-8 max-lg:hidden">
                <Btn
                  size="sm"
                  className="justify-center w-full"
                  onClick={() => setShowApplyModal(true)}
                >
                  <span>Apply for this job</span>
                </Btn>
              </div>
            </div>
          )}
        </div>
        {filteredJobs.length && (
          <div className="pb-14 md:pb-20 lg:pb-[120px]" ref={sectionDOM}>
            <h2 className="leading-none font-semibold font-PlayfairDisplay tracking-[-0.41px] mb-6 lg:text-2xl lg:leading-none lg:mb-12">
              Other jobs you may like
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredJobs.map((job) => (
                <JobsCard card={job} key={job.bcms.meta.en?.slug} />
              ))}
            </div>
            <div className="flex flex-col justify-center items-center mt-2 md:col-span-2 md:mt-6 lg:col-span-3">
              {filteredJobs.length < data.jobs.nodes.length && (
                <Btn
                  className="justify-center w-full max-md:mb-4 md:max-w-max"
                  onClick={loadMore}
                >
                  Load more jobs
                </Btn>
              )}
              {filteredJobs.length >= 5 && (
                <Btn
                  className="justify-center w-full md:hidden"
                  onClick={scrollToTop}
                >
                  Back to top
                </Btn>
              )}
            </div>
          </div>
        )}
      </div>
      {showApplyModal && (
        <ApplyModal job={data.page.bcms.meta.en} close={() => setShowApplyModal(false)} />
      )}
    </PageWrapper>
  );
};

export const query = graphql`
  query ($id: String!) {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsJob(bcms: { _id: { eq: $id } }) {
      ...Job
    }
  }
`;

export default JobPage;
