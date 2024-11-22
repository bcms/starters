import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { ContactPageContent } from '../types';
import ContentManager from '../components/ContentManager';
import ContactForm from '../components/contact-page/Form';

export interface ContactTemplateProps {
    pageContext: ContactPageContent;
}

const ContactTemplate: React.FC<ContactTemplateProps> = ({
    pageContext: { meta },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Hospitale`}>
            <div className="pt-8 pb-14 md:py-20 lg:py-[120px]">
                <div className="container">
                    <div className="max-w-[632px] mx-auto">
                        <h1 className="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-4 md:text-3xl md:leading-none lg:text-[80px] lg:leading-none lg:mb-5">
                            {meta.title}
                        </h1>
                        <ContentManager
                            items={meta.description.nodes}
                            className="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-center text-appGray-600 max-w-[446px] mx-auto mb-12 lg:text-base lg:leading-normal lg:mb-[88px]"
                        />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactTemplate;
