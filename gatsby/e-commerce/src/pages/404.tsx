import * as React from 'react';
import { PageProps } from 'gatsby';
import PageWrapper from '../components/PageWrapper';
import { Btn } from '../components/Btn';

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <PageWrapper title={`Page not found - Moda`}>
            <div className="flex flex-col gap-6 items-center justify-center min-h-[400px] lg:gap-10 lg:min-h-[550px]">
                <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                    Page Not Found
                </h1>
                <Btn theme="dark-green" label="Go back home" to="/" />
            </div>
        </PageWrapper>
    );
};

export default NotFoundPage;
