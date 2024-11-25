import * as React from 'react';
import { PageProps } from 'gatsby';
import PageWrapper from '../components/PageWrapper';
import Btn from '../components/Btn';

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <PageWrapper title={`Page not found - Tastyyy`}>
            <div className="flex flex-col items-center gap-6 justify-center my-auto min-h-[400px] lg:gap-10">
                <h1 className="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
                    Page Not Found
                </h1>
                <Btn
                    theme="accent"
                    size="sm"
                    to="/"
                    className="px-4 py-[13px] md:px-6 md:py-4"
                >
                    Go back home
                </Btn>
            </div>
        </PageWrapper>
    );
};

export default NotFoundPage;
