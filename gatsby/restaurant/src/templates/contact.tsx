import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { ContactPageContent } from '../types';
import ArchWithStar from '../components/ArchWithStar';
import ContentManager from '../components/ContentManager';
import { BCMSImage } from '@thebcms/components-react';
import Btn from '../components/Btn';

export interface ContactTemplateProps {
    pageContext: ContactPageContent;
}

const ContactTemplate: React.FC<ContactTemplateProps> = ({
    pageContext: { meta, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Tastyyy`}>
            <div>
                <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
                    <div className="container max-w-[1198px]">
                        <ArchWithStar />
                        <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[560px] xl:px-0">
                            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none lg:mb-20">
                                {meta.title}
                            </h1>
                            <ContentManager
                                items={meta.description.nodes}
                                className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-center text-appGray-700 mb-8 lg:text-base lg:leading-[1.3] lg:mb-12"
                            />
                            <div className="bg-[#E5E4DA] rounded-2xl p-4 mb-8 lg:mb-10">
                                <BCMSImage
                                    media={meta.map_image}
                                    clientConfig={bcms}
                                    className="w-full h-auto cover rounded-[10px] overflow-hidden pointer-events-auto"
                                />
                            </div>
                            <Btn
                                to="https://www.google.com/maps"
                                className="uppercase max-w-max mx-auto"
                            >
                                <span>Open maps</span>
                            </Btn>
                        </div>
                    </div>
                </section>
            </div>
        </PageWrapper>
    );
};

export default ContactTemplate;
