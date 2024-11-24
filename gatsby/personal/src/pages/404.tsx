import * as React from 'react';
import { Link, PageProps } from 'gatsby';
import PageWrapper from '../components/PageWrapper';

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <PageWrapper title={`Page not found - Personal Website`}>
            <div className="flex flex-col gap-6 items-center justify-center min-h-[400px] my-auto lg:gap-10">
                <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                    Page Not Found
                </h1>
                <Link
                    to="/"
                    className="flex px-[18px] py-[14px] rounded-[32px] border border-appGray-200 text-xs leading-none tracking-[-0.41px] font-medium text-appGray-500 uppercase mb-14 lg:px-6 lg:py-4 lg:text-sm lg:leading-none"
                >
                    Go back home
                </Link>
            </div>
        </PageWrapper>
    );
};

export default NotFoundPage;
