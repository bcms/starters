import * as React from 'react';
import { PageProps } from 'gatsby';
import PageWrapper from '../components/PageWrapper';
import Btn from '../components/Btn';

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <PageWrapper title={`Page not found - Hospitale`}>
            <div className="my-auto h-full flex flex-col gap-6 min-h-[400px] items-center justify-center lg:gap-10">
                <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                    Page Not Found
                </h1>
                <Btn to="/"> Go back home </Btn>
            </div>
        </PageWrapper>
    );
};

export default NotFoundPage;
