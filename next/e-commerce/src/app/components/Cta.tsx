import { ClientConfig } from '@thebcms/client';
import { PropMediaDataParsed } from '@thebcms/types';
import React from 'react';
import { BCMSImage } from '@thebcms/components-react';
import { Btn } from '@/components/Btn';

interface Props {
    title: string;
    description: string;
    image: PropMediaDataParsed;
    cta: {
        label: string;
        href: string;
    };
    bcms: ClientConfig;
}

export const HomeCta: React.FC<Props> = ({
    title,
    description,
    image,
    cta,
    bcms,
}) => {
    return (
        <section className="relative h-screen flex items-center py-20">
            <div className="container">
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-[32px] leading-[1.2] tracking-[-0.1px] text-appGray-900 max-w-[890px] mx-auto mb-4 md:text-[48px]">
                        {title}
                    </h2>
                    <p className="text-[20px] leading-[1.3] text-appGray-600 max-w-[710px] mx-auto mb-10">
                        {description}
                    </p>
                    <Btn theme="light-green" to={cta.href} label={cta.label} />
                </div>
            </div>
            <div className="absolute top-0 left-0 size-full">
                <BCMSImage
                    media={image}
                    className="size-full object-cover"
                    clientConfig={bcms}
                />
            </div>
        </section>
    );
};
