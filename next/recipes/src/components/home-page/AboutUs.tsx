import React from 'react';
import ContentManager from '@/components/ContentManager';
import { HomeAboutUsGroup } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';
import { bcmsPublic } from '@/bcms-public';

interface Props {
    data: HomeAboutUsGroup;
}

const HomePageAboutUs: React.FC<Props> = ({ data }) => {
    return (
        <section className="relative pb-8 lg:pb-20 xl:pb-[120px]">
            <div className="container">
                <div className="relative rounded-[20px] overflow-hidden p-4 lg:p-8 lg:pt-32 xl:pt-[280px]">
                    <div className="relative z-10 flex flex-col items-center text-center rounded-2xl px-4 py-6 bg-white/90 backdrop-blur-sm md:items-start md:text-left md:max-w-[540px] md:ml-auto lg:max-w-[740px] lg:p-10 lg:backdrop-blur">
                        <h2 className="leading-none font-semibold tracking-[-0.41px] text-appAccent mb-[14px] lg:text-[28px] lg:leading-none lg:mb-5">
                            {data.title}
                        </h2>
                        <ContentManager
                            items={data.description.nodes}
                            className="text-xs font-medium text-appGray-400 leading-normal mb-6 lg:text-xl lg:leading-normal lg:mb-8"
                        />
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10">
                            {data.stats.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-appAccent tracking-[-0.41px]"
                                >
                                    <div className="text-xl leading-none font-semibold mb-2.5 lg:text-[40px] lg:mb-[14px]">
                                        {item.value}
                                    </div>
                                    <div className="text-sm leading-none font-medium text-appGray-400 lg:text-base lg:leading-none">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 size-full">
                        <BCMSImage
                            media={data.cover_image}
                            clientConfig={bcmsPublic.getConfig()}
                            className=" size-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePageAboutUs;
