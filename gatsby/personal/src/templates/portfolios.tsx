import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { PortfoliosPageContent } from '../types';
import AnimatedTitle from '../components/AnimatedTitle';
import ContentManager from '../components/ContentManager';
import { Link } from 'gatsby';
import { BCMSImage } from '@thebcms/components-react';

export interface PortfolioTemplateProps {
    pageContext: PortfoliosPageContent;
}

const PortfoliosTemplate: React.FC<PortfolioTemplateProps> = ({
    pageContext: { meta, portfolio, bcms },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Personal Website`}
        >
            <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
                <div className="container">
                    <AnimatedTitle
                        title={meta.title}
                        className="mb-10 md:mb-20 lg:mb-[192px]"
                        titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                    />
                    <div className="grid grid-cols-1 gap-[33px] lg:gap-20">
                        {portfolio.map((item, index) => (
                            <Link
                                key={index}
                                to={`/portfolio/${item.meta.en?.slug}`}
                            >
                                {item.meta.en?.gallery?.[0] && (
                                    <BCMSImage
                                        media={item.meta.en.gallery[0]}
                                        clientConfig={bcms}
                                        className="w-full aspect-[2.07] object-cover rounded-[6px] overflow-hidden mb-4 lg:rounded-3xl lg:mb-12"
                                    />
                                )}
                                <div className="lg:flex lg:items-start lg:justify-between">
                                    <h3 className="flex text-sm leading-none tracking-[-0.41px] font-Helvetica mb-3 md:text-2xl md:leading-none lg:text-[32px]">
                                        {item.meta.en?.brand_name}
                                        <span className="text-[10px] ml-1.5 md:text-sm lg:text-xl">
                                            &#169;
                                        </span>
                                    </h3>
                                    <ContentManager
                                        items={
                                            item.meta.en?.description.nodes ||
                                            []
                                        }
                                        className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:max-w-[551px]"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PortfoliosTemplate;
