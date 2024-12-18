import React from 'react';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '../ContentManager';
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import type { ClientConfig } from '@thebcms/client';

interface Props {
    cover: PropMediaDataParsed;
    title: string;
    subtitle: string;
    description: PropRichTextDataParsed;
    bcmsConfig: ClientConfig;
}

const HomeAbout: React.FC<Props> = ({
    cover,
    title,
    subtitle,
    description,
    bcmsConfig,
}) => {
    return (
        <section className="pb-8 md:pb-20 lg:pb-[150px] xl:pb-[280px]">
            <div className="container">
                <div className="flex flex-col gap-4 lg:gap-6">
                    <BCMSImage
                        media={cover}
                        clientConfig={bcmsConfig}
                        className="w-full aspect-[2.26] object-cover rounded-lg overflow-hidden lg:aspect-[2.35]"
                        style={{
                            boxShadow:
                                '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                        }}
                    />

                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                        <div className="text-appGray-300 font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px] lg:flex-shrink-0">
                            {subtitle}
                        </div>
                        <div className="lg:max-w-[50%]">
                            <h2 className="font-bold leading-[1.2] tracking-[-0.32px] max-w-[52%] mb-2 lg:text-[32px] lg:tracking-[-0.64px] lg:max-w-[66%] xl:max-w-[60%]">
                                {title}
                            </h2>
                            <ContentManager
                                items={description.nodes}
                                className="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] max-w-[66%] lg:text-base lg:leading-[1.3] lg:tracking-[-0.32px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;
