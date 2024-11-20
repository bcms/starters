import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { ContactPageContent } from '../types';
import { TopGradient } from '../components/TopGradient';
import Form from '../components/contact/Form';

export interface ContactTemplateProps {
    pageContext: ContactPageContent;
}

const ContactTemplate: React.FC<ContactTemplateProps> = ({
    pageContext: { meta },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Insightfull Ink`}
        >
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
                <div className="container">
                    <div className="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12">
                        <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                            {meta.title}
                        </h1>
                        <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none">
                            {meta.subtitle}
                        </h2>
                    </div>
                </div>
                <TopGradient />
            </div>
            <Form />
        </PageWrapper>
    );
};

export default ContactTemplate;
