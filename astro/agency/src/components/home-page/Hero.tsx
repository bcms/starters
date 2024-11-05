import React from 'react';
import ContactUs from '../ContactUs';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '../ContentManager';
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import type { ClientConfig } from '@thebcms/client';

interface Props {
    title: PropRichTextDataParsed;
    gallery: PropMediaDataParsed;
    bcmsConfig: ClientConfig;
}

const HomeHero: React.FC<Props> = ({ title, gallery, bcmsConfig }) => {
    return (
        <section className="relative z-10 pt-2 pb-6 md:pt-5 md:mb-10 lg:mb-10">
            <div className="container">
                <div className="relative max-md:mb-6">
                    <ContentManager
                        items={title.nodes}
                        className="content relative z-20 w-[68%] text-[26px] font-medium leading-[1.1] tracking-[0.26px] max-w-[787px] [&_i]:font-PlayfairDisplay [&_strong]:text-appText-light [&_strong]:relative [&_strong]:after:absolute [&_strong]:after:z-[-1] [&_strong]:after:top-[calc(50%-3px)] [&_strong]:after:-translate-y-1/2 [&_strong]:after:left-0 [&_strong]:after:w-full [&_strong]:after:h-[calc(100%+4px)] [&_strong:first-of-type]:after:bg-appAccent-300 [&_strong:last-of-type]:after:bg-appAccent2 sm:text-4xl md:w-1/2 md:text-5xl lg:text-6xl md:[&_strong]:after:top-[calc(50%-5px)] lg:leading-[1.05] lg:tracking-[-1.76px] lg:[&_i]:tracking-[0.88px] lg:[&_strong]:after:top-[calc(50%-7px)] xl:w-[68%] xl:text-[88px] xl:[&_strong]:after:top-[calc(50%-8px)]"
                    />
                    <div className="absolute top-0 right-0 w-[49%] h-full min-h-[200px] max-sm:-right-2">
                        <BCMSImage
                            media={gallery}
                            clientConfig={bcmsConfig}
                            className="w-full full"
                        />
                    </div>
                </div>
                <ContactUs className="max-w-max md:hidden" />
            </div>
        </section>
    );
};

export default HomeHero;
