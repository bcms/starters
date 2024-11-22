import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { JobPageContent } from '../../types';
import { BCMSImage } from '@thebcms/components-react';
import JobDetails from '../../components/job-post-page/Details';

export interface JobTemplateProps {
    pageContext: JobPageContent;
}

const JobTemplate: React.FC<JobTemplateProps> = ({
    pageContext: { meta, jobs, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Hospitale`}>
            <div>
                <div className="relative mt-6 mb-10 lg:mt-0 lg:mb-[72px]">
                    <BCMSImage
                        media={meta.cover_image}
                        clientConfig={bcms}
                        className="w-full aspect-[2.76] object-cover lg:aspect-[3.71]"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
                </div>
                <JobDetails meta={meta} jobs={jobs} bcmsConfig={bcms} />
            </div>
        </PageWrapper>
    );
};

export default JobTemplate;
