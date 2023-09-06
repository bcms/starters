import React, { useMemo, useRef, useState } from 'react';
import { BCMSImage } from 'next-plugin-bcms/components';
import LocationIcon from '@/assets/icons/location.svg';
import { getHeaderAndFooter } from '@/utils/page-data';
import { JobEntry, JobEntryMeta } from '@/bcms/types';
import { JobPageData, PageProps } from '@/types';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { toJobLite } from '@/utils/job';
import { PageWrapper } from '@/components/PageWrapper';
import NextImage from 'next/image';
import ContentManager from '@/components/ContentManager';
import Btn from '@/components/Btn';
import JobsCard from '@/components/jobs/Card';
import ApplyModal from '@/components/jobs/ApplyModal';

const JobPage: React.FC<PageProps<JobPageData>> = ({
  header,
  footer,
  page,
}) => {
  const meta = useMemo(() => page.meta, []);
  const company = useMemo(() => page.meta.company.meta.en, []);

  const [jobsPerPage] = useState<number>(9);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);

  const sectionDOM = useRef<HTMLDivElement>(null);

  const filteredJobs = useMemo(() => {
    return page.jobs.slice(0, paginationPage * jobsPerPage) || [];
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
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="relative mt-6 mb-10 lg:mt-0 lg:mb-[72px]">
        <BCMSImage
          media={meta.cover}
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
                  className="w-8 h-8 rounded-full cover mr-3 lg:w-12 lg:h-12 lg:mr-[14px]"
                />
                <div>
                  <h1 className="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-1.5 lg:text-base lg:leading-none lg:mb-2.5">
                    {meta.title}
                  </h1>
                  <div className="flex items-center">
                    <NextImage
                      src={LocationIcon}
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
                <JobsCard card={job} key={job.slug} />
              ))}
            </div>
            <div className="flex flex-col justify-center items-center mt-2 md:col-span-2 md:mt-6 lg:col-span-3">
              {filteredJobs.length < page.jobs.length && (
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
        <ApplyModal job={page.meta} close={() => setShowApplyModal(false)} />
      )}
    </PageWrapper>
  );
};

interface ParamsI extends NextParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
  const client = getBcmsClient();
  const blogPosts = (await client.entry.getAll({
    template: 'job',
  })) as JobEntry[];
  const paths = blogPosts.map((blog) => {
    const meta = blog.meta.en as JobEntryMeta;
    return {
      params: {
        slug: meta.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<PageProps<JobPageData>> = async ({
  params,
}) => {
  const client = getBcmsClient();
  const headerFooterData = await getHeaderAndFooter(client);
  const jobPage = (await client.entry.get({
    template: 'job',
    entry: params?.slug as string,
  })) as JobEntry;

  if (!jobPage) {
    throw new Error('Job page entry does not exist.');
  }

  const jobs = (await client.entry.getAll({
    template: 'job',
  })) as JobEntry[];
  return {
    props: {
      header: headerFooterData.header,
      footer: headerFooterData.footer,
      page: {
        jobs: jobs.map((job) => toJobLite(job)),
        meta: jobPage.meta.en as JobEntryMeta,
      },
    },
  };
};

export default JobPage;
