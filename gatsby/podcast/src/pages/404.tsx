import * as React from 'react';
import { Link } from 'gatsby';
import PageWrapper from '../components/PageWrapper';

const NotFoundPage: React.FC = () => {
    return (
        <PageWrapper title={`Page not found - The Podium`}>
            <div className="w-screen min-h-[400px] my-auto flex flex-col gap-6 items-center justify-center lg:gap-10">
                <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                    Page Not Found
                </h1>
                <Link
                    to="/"
                    className="px-[14px] py-[9px] border border-appGray-700 rounded-[32px] text-sm leading-none tracking-[-0.41px] text-appGray-100 lg:px-6 lg:py-[15px] lg:text-2xl lg:leading-none"
                >
                    Go back home
                </Link>
            </div>
        </PageWrapper>
    );
};

export default NotFoundPage;
