import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import JobPostForm from '../../components/job-post-page/Form';

const HomeTemplate: React.FC = () => {
    return (
        <PageWrapper title={`Post your job - Hospitale`}>
            <div className="pt-8 pb-14 md:pb-20 lg:pt-20 lg:pb-[120px]">
                <div className="container">
                    <div className="max-w-[632px] mx-auto">
                        <JobPostForm />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default HomeTemplate;
