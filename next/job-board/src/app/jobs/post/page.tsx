import React from 'react';
import { Metadata } from 'next';
import Form from './components/Form';

const pageTitle = 'Post your job - Hospitale';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const JobsPostPage: React.FC = async () => {
    return (
        <div className="pt-8 pb-14 md:pb-20 lg:pt-20 lg:pb-[120px]">
            <div className="container">
                <div className="max-w-[632px] mx-auto">
                    <Form />
                </div>
            </div>
        </div>
    );
};

export default JobsPostPage;
