import { ClientConfig } from '@thebcms/client';
import { PropMediaDataParsed } from '@thebcms/types';
import React from 'react';
import Logo from '@/assets/icons/logo-white.svg';
import { BCMSImage } from '@thebcms/components-react';

interface Props {
    title: string;
    description: string;
    image: PropMediaDataParsed;
    bcms: ClientConfig;
}

export const HomeHero: React.FC<Props> = ({
    title,
    description,
    image,
    bcms,
}) => {
    return (
        <section className="relative overflow-hidden h-screen flex items-center">
            <div className="container">
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <h1 className="sr-only">{title}</h1>
                    <Logo className="w-[250px] text-white mb-8 md:w-[378px]" />
                    <p className="text-xl leading-none text-white">
                        {description}
                    </p>
                </div>
            </div>
            <div className="absolute top-0 left-0 size-full">
                <BCMSImage
                    media={image}
                    clientConfig={bcms}
                    className="size-full object-cover"
                />
            </div>
        </section>
    );
};
