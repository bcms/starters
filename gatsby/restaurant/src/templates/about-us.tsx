import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { AboutUsPageContent } from '../types';
import AboutHero from '../components/about-page/Hero';
import AboutTextImage from '../components/about-page/TextImage';

export interface AboutUstTemplateProps {
    pageContext: AboutUsPageContent;
}

const AboutUsTemplate: React.FC<AboutUstTemplateProps> = ({
    pageContext: { meta, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Tastyyy`}>
            <div>
                <AboutHero
                    title={meta.hero_title}
                    subtitle={meta.hero_subtitle}
                    description={meta.hero_description}
                    cover={meta.hero_cover}
                    bcmsConfig={bcms}
                />
                <AboutTextImage data={meta.text_image_cols} bcmsConfig={bcms} />
            </div>
        </PageWrapper>
    );
};

export default AboutUsTemplate;
