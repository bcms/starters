import React from 'react';
import { Metadata } from 'next';
import AnimatedTitle from '@/components/AnimatedTitle';
import Form from './components/Form';

const pageTitle = 'Contact - Personal Website';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const ContactPage: React.FC = () => {
    return (
        <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
            <div className="container">
                <AnimatedTitle
                    title="Contact"
                    className="mb-10 md:mb-20 lg:mb-[192px]"
                    titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                />
                <Form />
            </div>
        </div>
    );
};

export default ContactPage;
